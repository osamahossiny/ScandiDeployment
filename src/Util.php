<?php

namespace App;

class Util {
    public static function error_response($code, $message) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode(['error' => $message]);
        die();
    }
}