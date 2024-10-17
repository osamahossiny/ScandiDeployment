<?php

namespace App\Model;

class Price extends Base {
    public static function select(string $pid): array {
        $prices = (new static)->db->execute_statement(
            'SELECT 
                p.amount, c.label, c.symbol 
            FROM 
                price p
            JOIN
                currency c
            ON
                p.currency = c.label
            WHERE
                p.product_id = :id',
            [
                'id' => $pid,
            ]
        )->select_all();
        
        $callback = fn(array $obj): array => [
            'amount' => $obj['amount'],
            'currency' => [
                'label' => $obj['label'],
                'symbol' => $obj['symbol']
            ]
        ];
        $prices = array_map($callback, $prices);
        return $prices;
    }
}
