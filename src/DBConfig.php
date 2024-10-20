<?php

namespace App;

class DBConfig {
    public static function getDBConfig () {
        $jawsdb_url = parse_url(getenv("JAWSDB_URL"));
        $dbConfig =
        [
            'host' => $jawsdb_url['host'],
            'port' => 3306,
            'dbname' => ltrim($jawsdb_url['path'],'/'),
            'user' => $jawsdb_url['user'],
            'password' => $jawsdb_url['pass'],
            'charset' => "utf8mb4",
        ];
        return $dbConfig;
    }
}