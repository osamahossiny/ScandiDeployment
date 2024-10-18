<?php

namespace App;

use PDO;

class Database
{
    private $conn;
    private $stat;

    public function __construct()
    {
        $dbConfig = DBConfig::getDBConfig();
        $dsn = 'mysql:' . http_build_query($dbConfig, arg_separator: ';');

        try {
            $this->conn = new PDO($dsn, options: [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (\Exception $e) {
            Util::error_response(500, "Unable to connect to database");
        }
    }

    public function execute_statement($query, $params = [])
    {
        $this->stat = $this->conn->prepare($query);
        $this->stat->execute($params);

        return $this;
    }

    public function select_all()
    {
        return $this->stat->fetchAll();
    }

    public function select_one()
    {
        return $this->stat->fetch();
    }

    public function select_one_or_none()
    {
        $result = $this->select_one();
        if (!$result) {
            Util::error_response(404, "no data found");
        }
        return $result;
    }

    public function beginTransaction()
    {
        return $this->conn->beginTransaction();
    }

    public function commit()
    {
        return $this->conn->commit();
    }

    public function rollback()
    {
        return $this->conn->rollBack();
    }

    public function getLastInsertId()
    {
        return $this->conn->lastInsertId();
    }
    
    public function fetchColumn()
    {
        return $this->stat->fetchColumn();
    }


}