let cities = new Cities("http://localhost:8001");
cities.getCities("/cities");


//Bouton affichant le modal d'ajout d'une ville
document.getElementById("ajouter").addEventListener("click", () => {
    $("#myModalPost").modal();
});

//On soumet le formulaire d'ajout
document.getElementById("formCity").addEventListener("submit", (event) => {
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
document.getElementById("formCityUpdate").addEventListener("submit", (event) => {
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
const updateCity = (cityId) => {
    $("#myModalPut").modal();
    cities.putModalCity("/cities/", cityId);
}

//DELETE
const deleteCity = (cityId) => {
    cities.deleteCity("/cities/deleteCity.php", cityId)
}

//MODAL SHOW
const showCity = (cityId) => {
    //$("#myModal").modal();
    let weathers = new Weathers("http://localhost:8001");
    weathers.getWeathersByCityId("/cities/", cityId + "/weather");
    //window.location.href = weathers.url + "/page/meteos.php";
    //console.log(weathers);
    // cities.getCity("/cities/", cityId);
}