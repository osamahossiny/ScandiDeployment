<?php

namespace App\GraphQL\Resolver;

use App\Model\Category;

class CategoryResolver
{
    public static function find_all(): array
    {
        return Category::find_all();
    }
}