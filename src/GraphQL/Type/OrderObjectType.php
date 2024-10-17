<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderObjectType extends InputObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Order',
            'fields' => [
                'productList' => Type::listOf(new OrderProductObjectType()),
            ],
        ]);
    }
}
