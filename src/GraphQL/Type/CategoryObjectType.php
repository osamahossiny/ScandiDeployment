<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class CategoryObjectType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Category',
            'fields' => [
                'name' => Type::string(),
            ],
        ]);
    }
}
