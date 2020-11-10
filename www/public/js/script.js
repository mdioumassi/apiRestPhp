let cities = new Cities("http://localhost:8001");
cities.getCities("/cities");


//Bouton affichant le modal d'ajout d'une ville
document.getElementById("ajouter").addEventListener("click", function() {
    $("#myModalPost").modal();
});

//On soumet le formulaire d'ajout
document.getElementById("formCity").addEventListener("submit", function(event) {
    event.preventDefault();
    let country = document.forms["formCity"]['country'].value;
    let cityLabel = document.forms["formCity"]['city_label'].value;
    let city = {
        "country": country,
        "city_label": cityLabel
    }
    cities.postCity("/cities/postCity.php", city)
});

// On soumet les modifications
document.getElementById("formCityUpdate").addEventListener("submit", function(event) {
    event.preventDefault();

    let cityId = document.forms["formCityUpdate"]['city_id'].value;
    let country = document.forms["formCityUpdate"]['country'].value;
    let cityLabel = document.forms["formCityUpdate"]['city_label'].value;
    let city = {
        "city_id": cityId,
        "country": country,
        "city_label": cityLabel
    }
    cities.putCity("/cities/putCity.php", city)
});

//PUT
function updateCity(cityId) {
    $("#myModalPut").modal();
    cities.putModalCity("/cities/", cityId);
}

//DELETE
function deleteCity(cityId) {
    cities.deleteCity("/cities/deleteCity.php", cityId)
}

//MODAL SHOW
function showCity(cityId) {
    $("#myModal").modal();
    cities.getCity("/cities/", cityId);
}