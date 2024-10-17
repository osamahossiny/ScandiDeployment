<?php

namespace App\GraphQL\Resolver;

use App\Model\Order;
use App\Database;
use App\Model\OrderProduct;
use App\Model\OrderProductAttribute;
use App\Util;

class OrderResolver
{
    public static function createOrder(array $orderData): string
    {
        if (empty($orderData['productList'])) {
            Util::error_response(400, 'Products are required');
        }

        $db = new Database();
        $db->beginTransaction();

        try {
            $orderResult = Order::createOrder($db);
            if (!$orderResult['success']) {
                Util::error_response(500, $orderResult['error']);
            }
            $orderId = $orderResult['orderId'];

            $total = 0;
            $currency = null;

            // TODO currency conversions ?

            foreach ($orderData['productList'] as $product) {
                self::validateOrderProduct($db, $product);

                $orderProductDetails = self::getOrderProductDetails($db, $product);

                $addOrderProductResult = OrderProduct::addOrderProduct($db, $orderId, $orderProductDetails);
                if (!$addOrderProductResult['success']) {
                    Util::error_response(500, $addOrderProductResult['error']);
                }
                $total += $orderProductDetails['total'];
                if ($currency === null) {
                    $currency = $orderProductDetails['currency'];
                }
                foreach ($product['selectedAttributes'] as $attribute) {
                    $productAttributeData = $db->execute_statement('SELECT display_value, value FROM product_attribute WHERE id = ?', [$attribute['productAttributeId']])->select_one();
                    if (!$productAttributeData) {
                        Util::error_response(400, "Product: '{$product['productId']}' does not have attribute '{$attribute['productAttributeId']}'.");
                    }

                    $orderProductAttributeData = [
                        'orderProductId' => $addOrderProductResult['orderProductId'],
                        'attributeId' => $attribute['attributeId'],
                        'displayValue' => $productAttributeData['display_value'],
                        'value' => $productAttributeData['value'],
                    ];
                    $addOrderProductAttributeResult = OrderProductAttribute::addOrderProductAttribute($db, $orderProductAttributeData);
                    if (!$addOrderProductAttributeResult['success']) {
                        Util::error_response(500, $addOrderProductAttributeResult['error']);
                    }
                }
            }

            $setOrderDetailsResult = Order::setOrderDetails($db, $orderId, $total, $currency);
            if (!$setOrderDetailsResult['success']) {
                Util::error_response(500, $setOrderDetailsResult['error']);
            }

            $db->commit();

            return "Your order was placed successfully with order ID: '$orderId'";
        } catch (\Exception $e) {
            $db->rollback();
            throw $e;
        }
    }

    private static function validateOrderProduct(Database $db, array $product): void
    {
        $productId = $product['productId'];

        if (!isset($productId)) {
            Util::error_response(400, 'Product ID is required');
        }

        $productData = $db->execute_statement('SELECT inStock FROM product WHERE id = ?', [$productId])->select_one();

        if (!$productData) {
            Util::error_response(400, "Product: '{$product['productId']}' does not exist.");
        }

        if (!$productData['inStock']) {
            Util::error_response(400, "Product: '{$product['productId']}' is out of stock.");
        }

        $attributeCount = $db->execute_statement(
            'SELECT COUNT(DISTINCT attribute_id) FROM product_attribute WHERE product_id = ?',
            [$productId]
        )->fetchColumn();

        // selectedAttriubtes must be set even if empty
        if (!isset($product['selectedAttributes']) || $attributeCount !== count($product['selectedAttributes'])) {
            // print_r($product);
            Util::error_response(400, 'Attribute values are required' . isset($product['selectedAttributes']));
        }

        $attributeOccurences = [];
        foreach ($product['selectedAttributes'] as $attribute) {
            if (in_array($attribute['attributeId'],$attributeOccurences)) {
                Util::error_response(400, "Dublicate attributes detected for product: '{$productId}'");
            }
            array_push($attributeOccurences, $attribute['attributeId']);
            
            $result = $db->execute_statement(
                'SELECT COUNT(*) FROM product_attribute WHERE id = ? AND attribute_id = ? LIMIT 1',
                [$attribute['productAttributeId'], $attribute['attributeId']]
            );

            if ($result->fetchColumn() == 0) {
                Util::error_response(400, "Attribute: '{$attribute['value']}' does not exist for product: '{$productId}'");
            }
        }
    }

    private static function getOrderProductDetails(Database $db, array $product): array
    {
        $productId = $product['productId'];
        $amount = $product['amount'] ?? 1;

        $priceQuery = $db->execute_statement('SELECT amount, currency FROM price WHERE product_id = ?', [$productId]);
        $price = $priceQuery->select_one();

        if (!$price) {
            Util::error_response(500, "Could not find price for product '{$product['productId']}'");
        }

        $total = $price['amount'] * $amount;
        $currency = $price['currency'];

        return [
            'productId' => $productId,
            'amount' => $amount,
            'total' => $total,
            'currency' => $currency,
        ];
    }
}