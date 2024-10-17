<?php

namespace App\Model;

use App\Database;

class Order extends Base {
    
    protected static string $table = 'order'; // necessary to prevent uninitialization errors

    public static function createOrder(Database $db): array
    {
        $result = $db->execute_statement(
            'INSERT INTO `' . static::$table . '` (total, currency) VALUES (?, ?)',
            [0, 'EGP']
        );

        if (!$result) {
            return [
                'success' => false,
                'error' => 'Unable to create order'
            ];
        }

        return [
            'success' => true,
            'orderId' => $db->getLastInsertId()
        ];
    }
    public static function setOrderDetails(Database $db, int $orderId, float $total, string $currency): array
    {
        $result = $db->execute_statement(
            'UPDATE `' . static::$table . '` SET total = ?, currency = ? WHERE id = ?',
            [$total, $currency, $orderId]
        );

        if (!$result) {
            return [
                'success' => false,
                'error' => 'Unable to set order details'
            ];
        }

        return [
            'success' => true
        ];
    }
}