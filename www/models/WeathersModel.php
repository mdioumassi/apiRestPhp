<?php
class WeathersModel
{
    public $weather_id;
    public $city_id;
    public $temperature;
    public $weather;
    public $precipitation;
    public $humidity;
    public $wind;
    public $date;

    private $connexion;
    private $table = "weather";

    /**
     * WeathersModel constructor.
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * @return mixed
     */
    public function getWeathers()
    {
        $sql = "SELECT w.weather_id, c.city_id, c.country, c.city_label, w.temperature, w.weather, w.precipitation, w.humidity, w.wind, w.date
                FROM " . $this->table . " w
                LEFT JOIN city c ON w.city_id = c.city_id
                WHERE c.city_id = ?
                ORDER BY w.date DESC";

        $query = $this->connexion->prepare($sql);
        $query->bindParam(1, $this->city_id);
        $query->execute();
        return $query;
    }

    /**
     * @return bool
     */
    public function postWeathers()
    {
        $sql = "INSERT INTO " . $this->table . " 
                SET city_id=:city_id, temperature=:temperature, weather=:weather, 
                precipitation=:precipitation, humidity=:humidity, wind=:wind";

        $query = $this->connexion->prepare($sql);

        $this->weather_id = htmlspecialchars(strip_tags($this->weather_id));
        $this->city_id = htmlspecialchars(strip_tags($this->city_id));
        $this->temperature = htmlspecialchars(strip_tags($this->temperature));
        $this->weather = htmlspecialchars(strip_tags($this->weather));
        $this->precipitation = htmlspecialchars(strip_tags($this->precipitation));
        $this->humility = htmlspecialchars(strip_tags($this->humidity));
        $this->wind = htmlspecialchars(strip_tags($this->wind));

        $query->bindParam(":city_id", $this->city_id);
        $query->bindParam(":temperature", $this->temperature);
        $query->bindParam(":weather", $this->weather);
        $query->bindParam(":precipitation", $this->precipitation);
        $query->bindParam(":humidity", $this->humidity);
        $query->bindParam(":wind", $this->wind);

        if($query->execute()){
            return true;
        }
        return false;
    }

    public function deleteWeather()
    {
        $sql = "DELETE FROM " . $this->table . " WHERE weather_id = ?";

        $query = $this->connexion->prepare( $sql );
        $this->weather_id = htmlspecialchars(strip_tags($this->weather_id));

        $query->bindParam(1, $this->weather_id);

        if($query->execute()){
            return true;
        }

        return false;
    }

}