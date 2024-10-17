<?php

namespace App\Model;

use App\Database;
use ReflectionClass;

abstract class Base
{
    protected Database $db;
    protected static string $table;

    public function __construct()
    {
        $this->db = new Database();
        if (!isset(static::$table)) {
            static::$table = strtolower((new ReflectionClass($this))->getShortName());
        }
    }

    public static function find_all(): array
    {
        return (new static)->db->execute_statement('SELECT * FROM ' . static::$table)->select_all();
    }

    public static function find_one(string $value, string $column): ?array
    {
        return (new static)->db->execute_statement(
            'SELECT * FROM ' . static::$table . ' WHERE ' . $column . ' = :value LIMIT 1',
            [
                'value' => $value,
            ]
        )->select_one_or_none();
    }

    public static function find_many(string $value, string $column): array
    {
        if (empty($value)) {
            return static::find_all();
        } else {
            return (new static)->db->execute_statement(
                'SELECT * FROM ' . static::$table . ' WHERE ' . $column . ' = :value',
                [
                    'value' => $value,
                ]
            )->select_all();
        }
    }
}