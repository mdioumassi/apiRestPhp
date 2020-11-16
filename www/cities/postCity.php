<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include_once "../conf/ConnexionBD.php";
    include_once "../models/CitiesModel.php";

    //$db = (new Database())->getConnection();
    $instance = ConnexionBD::getInstance();
    $db = $instance->getConnextion();
    $city = new CitiesModel($db);

    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->country) && !empty($data->city_label)) {
        $city->country = $data->country;
        $city->city_label = $data->city_label;
    }
    if ($city->postCity()) {
        http_response_code(201);
        echo json_encode(["message" => "L'ajout a été effectué"]);
    }
} else {
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}
