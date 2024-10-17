<?php

namespace App\Model;

class Gallary extends Base {
    protected static string $table = 'product_gallary';
    public static function select(string $value, string $column): array {
        $values = static::find_many($value, $column);
        $callback = fn(array $obj): string => $obj['link'];
        $values = array_map($callback, $values);
        return $values;
    }
}
