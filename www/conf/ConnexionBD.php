<?php


class ConnexionBD
{
     private $db_name = "weather_city";
     private $username = "root";
     private $password = "test";
     private static $instance = null;
     private $connexion;
     private function __construct()
     {
         $this->connexion = $this->connexion = new PDO("mysql:host=database" . ";dbname=" . $this->db_name, $this->username, $this->password);
         $this->connexion->exec("set names utf8");
     }

     public static function getInstance()
     {
         if (!self::$instance) {
             self::$instance = new ConnexionBD();
         }

         return self::$instance;
     }

     public function getConnextion()
     {
         return $this->connexion;
     }
}