<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    //include_once "../conf/Database.php";
    include_once "../conf/ConnexionBD.php";
    include_once "../models/CitiesModel.php";

    //$db = (new Database())->getConnection();
    $instance = ConnexionBD::getInstance();
    $db = $instance->getConnextion();
    $citiesModel = new CitiesModel($db);
    $stmt = $citiesModel->getCities();
    if ($stmt->rowCount() > 0) {
        $tabCities = [];
        $tabCities['cities'] = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $tab = [
                'city_id' => $city_id,
                'country' => $country,
                'city_label' => $city_label,
                'CREATION_DATE' => $CREATION_DATE
            ];
            $tabCities['cities'][] = $tab;
        }
        http_response_code(200);
        echo json_encode($tabCities);
    }
} else {
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}
