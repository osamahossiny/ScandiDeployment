<?php

namespace App\GraphQL;

use App\GraphQL\Resolver\OrderResolver;
use App\GraphQL\Type\OrderObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class Mutation
{
    public static function getMutations()
    {
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'sum' => [
                    'type' => Type::int(),
                    'args' => [
                        'x' => ['type' => Type::int()],
                        'y' => ['type' => Type::int()],
                    ],
                    'resolve' => static fn ($calc, array $args): int => $args['x'] + $args['y'],
                ],
                'order' => [
                    'type' => Type::string(),
                    'args' => [
                        'orderData' => Type::nonNull(new OrderObjectType()),
                    ],
                    'resolve' => static fn ($rootValue, array $args) => OrderResolver::createOrder($args['orderData']),
                ],
            ],
        ]);
    }
}
