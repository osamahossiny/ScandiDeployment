<?php

namespace App;

class DBConfig {
    public static function getDBConfig () {
        $dbConfig =
        [
            'host' => 'dz8959rne9lumkkw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
            'port' => 3306,
            'dbname' => "uyk14t04diqq7snw",
            'user' => "ek9wa54mzb5jpz2i",
            'password' => "mii0ixzmw9poytf5",
            'charset' => "utf8mb4",
        ];
        return $dbConfig;
    }
}