<?php
class CitiesModel
{
    // Connexion
    private $connexion;
    private $table = "city";

    // object properties
    public $city_id;
    public $country;
    public $city_label;
    public $CREATION_DATE;

    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db)
    {
        $this->connexion = $db;
    }

    /**
     * GetCities
     *
     * @return void
     */
    public function getCities()
    {
        $sql = "SELECT city_id, country, city_label, CREATION_DATE
                FROM " . $this->table . "
                ORDER BY CREATION_DATE DESC";
        $query = $this->connexion->prepare($sql);
        $query->execute();

        return $query;
    }

    /**
     * GetCity
     *
     * @return array
     */
    public function getCity($city_id = 0)
    {
        $sql = "SELECT city_id, country, city_label, CREATION_DATE 
                FROM " . $this->table . "
                WHERE city_id = ? LIMIT 0,1";

        $query = $this->connexion->prepare($sql);
        $query->bindParam(1, $city_id);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);

        return [
            'city_id' => $row['city_id'],
            'country' => $row['country'],
            'city_label' => $row['city_label'],
            'CREATION_DATE' => $row['CREATION_DATE']
        ];
    }

    /**
     * CreateCity
     *
     * @return void
     */
    public function postCity()
    {
        $sql = "INSERT INTO " . $this->table . " 
                SET country=:country, city_label=:city_label";
        $query = $this->connexion->prepare($sql);

        $this->country=htmlspecialchars(strip_tags($this->country));
        $this->city_label=htmlspecialchars(strip_tags($this->city_label));

        $query->bindParam(":country", $this->country);
        $query->bindParam(":city_label", $this->city_label);

        if($query->execute()){
            return true;
        }
        return false;
    }

    /**
     * Supprimer un produit
     *
     * @return void
     */
    public function deleteCity(){
        $sql = "DELETE FROM " . $this->table . " WHERE  city_id = ?";

        $query = $this->connexion->prepare( $sql );
        $this->city_id = htmlspecialchars(strip_tags($this->city_id));

        $query->bindParam(1, $this->city_id);

        if($query->execute()){
            return true;
        }

        return false;
    }

    /**
     * Mettre à jour un produit
     *
     * @return void
     */
    public function modifier(){
        // On écrit la requête
        $sql = "UPDATE " . $this->table . " SET nom = :nom, prix = :prix, description = :description, categories_id = :categories_id WHERE id = :id";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On sécurise les données
        $this->nom=htmlspecialchars(strip_tags($this->nom));
        $this->prix=htmlspecialchars(strip_tags($this->prix));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->categories_id=htmlspecialchars(strip_tags($this->categories_id));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // On attache les variables
        $query->bindParam(':nom', $this->nom);
        $query->bindParam(':prix', $this->prix);
        $query->bindParam(':description', $this->description);
        $query->bindParam(':categories_id', $this->categories_id);
        $query->bindParam(':id', $this->id);

        // On exécute
        if($query->execute()){
            return true;
        }

        return false;
    }

}