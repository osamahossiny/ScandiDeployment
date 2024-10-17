<?php

namespace App\Model;

class Attribute extends Base {

    public static function select(string $pid): array {
        $values = (new static)->db->execute_statement(
            'SELECT 
                a.name , 
                a.type ,
                a.id,
                pa.product_id as productId,
                pa.id as itemId,
                pa.display_value as displayValue,
                pa.value
            FROM 
                product_attribute pa
            JOIN 
                attribute a
            ON 
                pa.attribute_id = a.id 
            WHERE 
                product_id = :pid',
            [
                'pid' => $pid,
            ]
        )->select_all();

        $composed = [];

        foreach ($values as $value) {
            if (isset($composed[$value['id']])) {
                array_push($composed[$value['id']]['items'], [
                    'id' => $value['itemId'],
                    'displayValue' => $value['displayValue'],
                    'value' => $value['value']
                ]);
            }
            else {
                $composed[$value['id']] = [
                    'id' => $value['id'],
                    'name' => $value['name'],
                    'type' => $value['type'],
                    'productId' => $value['productId'],
                    'items' => [
                        [
                            'id' => $value['itemId'],
                            'displayValue' => $value['displayValue'],
                            'value' => $value['value']
                        ]
                    ]
                ];
            }
        }
        
        // $composed = array_values($composed);

        // print_r($values);
        // die();
        return $composed;
    }
}
