class Cities {
    constructor(url) {
        this.url = url;
        //this.request = request;
    }

    getCities(cities) {
            fetch(`${this.url}${cities}`)
                .then((reponse) => {
                    return reponse.json()
                })
                .then((data) => {
                    let HTML =
                        '<table class=\'table\'>\n' +
                        '        <thead>\n' +
                        '        <tr>\n' +
                        '            <th>ID</th>\n' +
                        '            <th>PAYS</th>\n' +
                        '            <th>Ville</th>\n' +
                        '            <th>DATE CREATION</th>\n' +
                        '            <th>ACTIONS</th>\n' +
                        '        </tr>\n' +
                        '        </thead><tbody>';
                    for (let city of data['cities']) {
                        HTML +=
                            '<tr>' +
                            '<td>' + city.city_id + '</td>' +
                            '<td>' + city.country + '</td>' +
                            '<td>' + city.city_label + '</td>' +
                            '<td>' + city.CREATION_DATE + '</td>' +
                            '<td><button type="button" class="btn btn-link" onclick = "showCity(' + city.city_id + ')" id="showCity">Voir</button> | ' +
                            '<button type="button" class="btn btn-link" onclick = "updateCity(' + city.city_id + ')">Modifier</button> | ' +
                            '<button type="button" class="btn btn-link" onclick = "deleteCity(' + city.city_id + ')">Supprimer</button></td>'
                        '</tr>'
                    }
                    HTML += "</tbody></table>";
                    document.querySelector('#result').innerHTML = HTML
                })
                .catch((error) => {
                    console.log("erreur")
                })
        }
        /**
         * 
         * @param {number} cityId 
         */
    getCity(cities, cityId) {
            fetch(`${this.url}${cities}${cityId}`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    let modal = '';
                    modal += ' <!-- Modal Header -->\n' +
                        '            <div class="modal-header">\n' +
                        '                <h4 class="modal-title">Info ville</h4>\n' +
                        '                <button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
                        '            </div>\n' +
                        '\n' +
                        '            <!-- Modal body -->\n' +
                        '            <div class="modal-body">\n' +
                        '            <strong>Pays: </strong>' + data['country'] + '<br>' +
                        '            <strong>Capital: </strong>' + data['city_label'] + '<br>' +
                        '            <strong>Date création: </strong>' + data['CREATION_DATE'] +
                        '            </div>\n' +
                        '\n' +
                        '            <!-- Modal footer -->\n' +
                        '            <div class="modal-footer">\n' +
                        '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
                        '            </div>'

                    document.querySelector('.modal-content').innerHTML = modal
                })
        }
        /**
         * 
         * @param {string} request 
         * @param {number} cityId 
         */
    deleteCity(request, cityId) {
            let city = {
                "city_id": cityId
            }
            fetch(`${this.url}${request}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(city)
                })
                .then((response) => {
                    if (response.ok) {
                        window.location.href = this.url + "/page/villes.php";
                    }
                })
                .catch((error) => {
                    console.log('erreur')
                })
        }
        /**
         * 
         * @param {string} request 
         * @param {string} city 
         */
    postCity(request, city) {
            fetch(`${this.url}${request}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(city)
                })
                .then((response) => {
                    if (response.ok) console.log("Ville crée")
                    window.location.href = "http://localhost:8001/page/villes.php";
                })
                .catch((error) => {
                    console.log('erreur')
                })
        }
        /**
         * 
         * @param {string} request 
         * @param {string} cityId 
         */
    putModalCity(request, cityId) {
            fetch(`${this.url}${request}${cityId}`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    let modalPut =
                        '<div class="form-group">' +
                        '<input type="text" class="form-control form-control-sm" name="country" value=' + data['country'] + '>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<input type="text" class="form-control form-control-sm" name="city_label" value=' + data['city_label'] + '>' +
                        '<input type="hidden" class="form-control form-control-sm" name="city_id" value=' + cityId + '>' +
                        '</div>' +
                        ' <button type="submit" class="btn btn-primary">Modifier</button>'
                    document.querySelector('#formCityUpdate').innerHTML = modalPut
                })

            .catch((error) => {
                console.log('Erreur')
            })
        }
        /**
         * 
         * @param {string} request 
         * @param {string} city 
         */
    putCity(request, city) {
        fetch(`${this.url}${request}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(city)
            })
            .then((response) => {
                if (response.ok) console.log("Ville modifié")
                window.location.href = this.url + "/page/villes.php";
            })
            .catch((error) => {
                console.log('erreur')
            })
    }
}