<?php
class Database
{
    // Connexion à la base de données
    //private $host = "localhost:8001";
    private $db_name = "weather_city";
    private $username = "root";
    private $password = "password";
    public $connexion;

    // getter pour la connexion
    public function getConnection()
    {

        $this->connexion = null;

        try {
            $this->connexion = new PDO("mysql:host=localhost2" . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->connexion->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }

        return $this->connexion;
    }
}

$db = new Database();

var_dump($db->getConnection());
