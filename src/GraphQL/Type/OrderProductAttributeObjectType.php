<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderProductAttributeObjectType extends InputObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'OrderProductAttribute',
            'fields' => [
                'attributeId' => ['type' => Type::nonNull(Type::string())],
                'productAttributeId' => ['type' => Type::nonNull(Type::string())],            ],
        ]);
    }
}
