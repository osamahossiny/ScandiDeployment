<?php

namespace App\Model;

class Product extends Base {

    public static function select_many(string $value, string $column): array {
        $values = [];
        if ($column == 'category' && $value == 'all') {
            $values = static::find_all();
        }
        else {
            $values = static::find_many($value, $column);
        }
        $composed_values = [];
        foreach ($values as $value) {
            array_push($composed_values, static::compose($value));
        }

        return $composed_values;
    }
    public static function select_one(string $pid): array {
        $value = static::find_one($pid, 'id');
        $value = static::compose($value);
        return $value;
    }
    
    public static function compose(array $product) {
        $links = Gallary::select($product['id'], 'product_id');
        $product['gallery'] = $links;
        
        $prices = Price::select($product['id']);
        $product['prices'] = $prices;
        
        $attributes = Attribute::select($product['id']);
        $product['attributes'] = $attributes;
        
        return $product;
    }
}
