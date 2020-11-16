class Weathers {
    constructor(url) {
        this.url = url;
        //this.cityId = cityId;
    }

    getWeathersByCityId(cities, request) {
        // console.log(`${this.url}${cities}${request}`);
        fetch(`${this.url}${cities}${request}`)
            .then((reponse) => {
                return reponse.json()
            })
            .then((data) => {
                console.log(data['message']);
                let HTML =
                    '<table class=\'table\'>\n' +
                    '        <thead>\n' +
                    '        <tr>\n' +
                    '            <th>ID</th>\n' +
                    '            <th>Température</th>\n' +
                    '            <th>Temp</th>\n' +
                    '            <th>Précipitation</th>\n' +
                    '            <th>Humidité</th>\n' +
                    '            <th>Vent</th>\n' +
                    '            <th>Date</th>\n' +
                    '            <th>Actions</th>\n' +
                    '        </tr>\n' +
                    '        </thead><tbody>';
                for (let weather of data['weathers']) {

                    HTML +=
                        '<tr>' +
                        '<td>' + weather.weather_id + '</td>' +
                        '<td>' + weather.temperature + '</td>' +
                        '<td>' + weather.weather + '</td>' +
                        '<td>' + weather.precipitation + '</td>' +
                        '<td>' + weather.humidity + '</td>' +
                        '<td>' + weather.wind + '</td>' +
                        '<td>' + weather.date + '</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-link">Modifier</button> | ' +
                        '<button type="button" class="btn btn-link">Supprimer</button></td>'
                    '</tr>'
                }
                HTML += "</tbody></table>";
                //console.log(HTML);
                document.querySelector('#myModalWeather .modal-body').innerHTML = HTML;
                $("#myModalWeather").modal();
            })
            .catch((error) => {
                console.log("erreur")
            })
    }
}