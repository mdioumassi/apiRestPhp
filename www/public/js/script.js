//const resultat = document.getElementById('result').innerHTML;
//window.onload = () => {
    //GET
    fetch("http://localhost:8001/cities")
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
            for(let city of data['cities']) {
                HTML +=
                    '<tr>' +
                    '<td>'+city.city_id+'</td>' +
                    '<td>'+city.country+'</td>' +
                    '<td>'+city.city_label+'</td>' +
                    '<td>'+city.CREATION_DATE+'</td>' +
                    '<td><button type="button" class="btn btn-link" onclick = "showCity('+city.city_id+')" id="showCity">Voir</button> | ' +
                    '<button type="button" class="btn btn-link">Modifier</button> | ' +
                    '<button type="button" class="btn btn-link" onclick = "deleteCity('+city.city_id+')">Supprimer</button></td>'
                '</tr>'
            }
            HTML += "</tbody></table>";
            document.querySelector('#result').innerHTML = HTML
        })
        .catch((error) => {
            console.log("erreur")
        })
//POST
    document.getElementById("ajouter")
        .addEventListener("click", function (){
                $("#myModalPost").modal();
    });

    function validateForm(){
        let country = document.forms["formCity"]['country'].value;
        let cityLabel = document.forms["formCity"]['city_label'].value;
        let city = {
            "country": country,
            "city_label": cityLabel
        }
        fetch("http://localhost:8001/cities/postCity.php", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(city)
        })
        .then((response) => {
            if (response.ok) console.log("Ville crée")
        })
        .catch((error) => {
            console.log('erreur')
        })
    }
    //Delete
    function deleteCity(cityId) {
        let city = {
            "city_id": cityId
        }
        fetch("http://localhost:8001/cities/deleteCity.php", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(city)
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "http://localhost:8001/page/villes.php";
                }
            })
            .catch((error) => {
                console.log('erreur')
            })
    }

    //Function showCity
    function showCity(cityId) {
        $("#myModal").modal();
        fetch("http://localhost:8001/cities/"+cityId)
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
                    '<strong>Pays: </strong>'+ data['country'] +'<br>' +
                    '<strong>Capital: </strong>'+ data['city_label']+'<br>' +
                    '<strong>Date création: </strong>'+ data['CREATION_DATE'] +
                    '            </div>\n' +
                    '\n' +
                    '            <!-- Modal footer -->\n' +
                    '            <div class="modal-footer">\n' +
                    '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
                    '            </div>'

                document.querySelector('.modal-content').innerHTML = modal
            })
    }
//}
