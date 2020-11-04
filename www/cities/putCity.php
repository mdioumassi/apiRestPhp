<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    include_once "../conf/Database.php";
    include_once "../models/CitiesModel.php";

    $db = (new Database())->getConnection();
    $city = new CitiesModel($db);

    $data = json_decode(file_get_contents("php://input"));
  
    if (!empty($data->city_id) && !empty($data->country) && !empty($data->city_label)) {
        $city->city_id = $data->city_id;
        $city->country = $data->country;
        $city->city_label = $data->city_label;
    }
    if ($city->putCity()) {
        http_response_code(200);
        echo json_encode(["message" => "La modification a été effectuée"]);
    }
} else {
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}