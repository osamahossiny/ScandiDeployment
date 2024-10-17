<?php

namespace App\Model;

use App\Database;

class OrderProduct extends Base
{
    protected static string $table = 'order_product';

    public static function addOrderProduct(Database $db,int $orderId, array $productDetails): array
    {
        $result = $db->execute_statement(
            'INSERT INTO ' .
                static::$table .
                ' (order_id, product_id, amount, total, currency) VALUES (?, ?, ?, ?, ?)',
            [
                $orderId,
                $productDetails['productId'],
                $productDetails['amount'],
                $productDetails['total'],
                $productDetails['currency'],
            ]
        );

        if (!$result) {
            return [
                'success' => false,
                'error' => 'Unable to add order product'
            ];
        }

        return [
            'success' => true,
            'orderProductId' => $db->getLastInsertId()
        ];
    }
}