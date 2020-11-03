<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    include_once "../conf/Database.php";
    include_once "../models/WeathersModel.php";

    $db = (new Database())->getConnection();
    $weathers = new WeathersModel($db);


    if (!empty($_GET["city_id"])) {
        $weathers->city_id = $_GET["city_id"];
        $stmt = $weathers->getWeathers();
        if($stmt->rowCount() > 0) {
            $tabWeathers = [];
            $tabWeathers['weathers'] = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $tab = [
                   'weather_id' => $weather_id,
                   'temperature' => $temperature,
                   'weather' => $weather,
                   'precipitation' => $precipitation,
                   'humidity' => $humidity,
                   'wind' > $wind,
                   'date' => $date
                ];
                $tabWeathers['weathers'][] = $tab;
            }

            http_response_code(200);
            echo json_encode($tabWeathers);
        }
    }

} else {
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}