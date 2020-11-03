<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    include_once "../conf/Database.php";
    include_once "../models/CitiesModel.php";

    $db = (new Database())->getConnection();
    $citiesModel = new CitiesModel($db);
    if (!empty($_GET["city_id"])) {
        $cityId = $_GET["city_id"];
        $city = $citiesModel->getCity($cityId);

        http_response_code(200);
        echo json_encode($city);
    }

} else {
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}