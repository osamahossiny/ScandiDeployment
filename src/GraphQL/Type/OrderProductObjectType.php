<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderProductObjectType extends InputObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'OrderProduct',
            'fields' => [
                'productId' => ['type' => Type::nonNull(Type::string())],
                'amount' => ['type' => Type::nonNull(Type::int())],
                'selectedAttributes' => [
                    'type' => Type::listOf(new OrderProductAttributeObjectType())
                ],
            ],
        ]);
    }
}
