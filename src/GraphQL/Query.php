<?php

namespace App\GraphQL;

use App\GraphQL\Resolver\CategoryResolver;
use App\GraphQL\Resolver\ProductResolver;
use App\GraphQL\Type\CategoryObjectType;
use App\GraphQL\Type\ProductObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Query {
    public static function getQueries() {
        
        $POT = new ProductObjectType();

        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'echo' => [
                    'type' => Type::string(),
                    'args' => [
                        'message' => Type::string(),
                    ],
                    'resolve' => static fn ($rootValue, array $args): string => $args['message'],
                ],
                'categories' => [
                    'type' => Type::listOf(new CategoryObjectType()),
                    'resolve' => static fn ($rootValue, array $args) => CategoryResolver::find_all(),
                ],
                'products' => [
                    'type' => Type::listOf($POT),
                    'args' => [
                        'category' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn ($rootValue, array $args) => ProductResolver::select_many($args['category'] ?? ''),
                ],
                'product' => [
                    'type' => $POT,
                    'args' => [
                        'pid' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn ($rootValue, array $args) => ProductResolver::select_one($args['pid'] ?? ''),
                ],
            ],
        ]);
    }
}
