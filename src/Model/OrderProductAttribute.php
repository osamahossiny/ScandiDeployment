<?php

namespace App\Model;

use App\Database;

class OrderProductAttribute extends Base
{
    protected static string $table = 'order_product_attribute';

    public static function addOrderProductAttribute(Database $db, array $productAttributeDetails): array
    {
        $result = $db->execute_statement(
            'INSERT INTO ' .
                static::$table .
                ' (order_product_id, attribute_id, display_value, value) VALUES (?, ?, ?, ?)',
            [
                $productAttributeDetails['orderProductId'],
                $productAttributeDetails['attributeId'],
                $productAttributeDetails['displayValue'],
                $productAttributeDetails['value'],
            ]
        );

        if (!$result) {
            return [
                'success' => false,
                'error' => 'Unable to add order product attribute'
            ];
        }

        return [
            'success' => true,
        ];
    }
}