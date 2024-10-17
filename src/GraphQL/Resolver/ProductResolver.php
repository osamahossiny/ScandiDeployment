<?php

namespace App\GraphQL\Resolver;

use App\Model\Product;

class ProductResolver
{
    public static function select_many(?string $category = null): array
    {
        return Product::select_many($category, 'category');
    }

    public static function select_one(string $productId): array
    {
        return Product::select_one($productId);
    }
}