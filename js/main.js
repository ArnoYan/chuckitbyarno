"use strict";

document.addEventListener('DOMContentLoaded', init);

let allCategories = [];
let alleFilms = [];

function init() {


    console.log(window.location.pathname);

    if (window.location.pathname === '/chuckitbyarno/index.html' || window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname === '/chuckitbyarno/') {

        getAllCategories();

    } else if (window.location.pathname === '/chuckitbyarno/movie.html' || window.location.pathname === '/movie.html') {

        getChuckMovies();

    }


    document.getElementById("getNewRandomQuote").addEventListener("click", getChuckRandomJoke);
    //  summeryOnOff();

}

function getChuckRandomJoke(e) {
    console.log('gelukt!');
    e.preventDefault();
    fetch('https://api.chucknorris.io/jokes/random', {

        headers: new Headers({

            'Accept': 'application/json'

        })
    }).then(function (response) {
        if (response.ok) return response.json();
        throw  new Error('Failed to return')

    }).then(function (json) {

        if (json.url === 'https://api.chucknorris.io/jokes/uqgBYN06SDi9wbQM3A2iKQ') //te lang
        {
            document.getElementById('GenQuotes').innerHTML = json.value.substr(0, json.value.indexOf('.'));

        } else {

            document.getElementById('GenQuotes').innerHTML = json.value;

        }


        document.getElementById('QuoteCategorie').innerHTML = '<span>Categorie: </span>' + "Not defined in API";

    })


}

function getAllCategories() {

    fetch('https://api.chucknorris.io/jokes/categories', {

        cache: 'no cache',
        headers: new Headers({

            'Accept': 'application/json'

        })
    }).then(function (response) {
        if (response.ok) return response.json();
        throw  new Error('Failed to return')

    }).then(function (json) {
        for (let i = 0; i < json.length; i++) {

            allCategories.push(json[i]); //eerst lokaal opslaan voor de snelheidswenst bij de interactie met de gebruiker

        }

        let categorieLijst = document.getElementById("Categories");

        for (let i = 0; i < allCategories.length; i++) {


            categorieLijst.innerHTML += '<li id="' + allCategories[i] + '"><a href="#"><img src="images/cats/' + allCategories[i] + '.jpg" alt="' + allCategories[i] + '"' + '</a>'
                + '<a href="#">' + allCategories[i] + '</a></li>';


        }


        let lijstVanLinkCategories = document.querySelectorAll("#Categories li");
        console.log(lijstVanLinkCategories);

        for (let i = 0; i < lijstVanLinkCategories.length; i++) {

            lijstVanLinkCategories[i].addEventListener("click", getJokeByCategorie);
        }

    })


} //being done at start

function getJokeByCategorie(e) {
    e.preventDefault();

    let chosenCategorie = e.currentTarget.getAttribute('id');
    fetch('https://api.chucknorris.io/jokes/random?category=' + chosenCategorie, {

        cache: 'no cache',
        headers: new Headers({

            'Accept': 'application/json'

        })
    }).then(function (response) {
        if (response.ok) return response.json();
        throw  new Error('Failed to return')

    }).then(function (json) {

        document.getElementById('GenQuotes').innerHTML = json.value;

        if (json.category == null) {

            document.getElementById('QuoteCategorie').innerHTML = '<span>Categorie: </span> ' + "Not defined in API";


        } else {

            document.getElementById('QuoteCategorie').innerHTML = '<span>Categorie: </span> ' + json.category;

        }


    })
}


function getChuckMovies() {


    /*Start*/

    fetch('https://api.themoviedb.org/3/person/51576/movie_credits?api_key=96eaa07b5e1250edb1f755f50f8e4336&language=en-US', {

        cache: 'no cache',
        headers: new Headers({

            'Accept': 'application/json'

        })
    }).then(function (response) {
        if (response.ok) return response.json();
        throw  new Error('Failed to return')

    }).then(function (json) {


        for (let i = 0; i < json.cast.length; i++) {

//https://image.tmdb.org/t/p/w600_and_h900_bestv2/  poster_path

            let film = {
                Titel: json.cast[i].original_title,
                PosterImage: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + json.cast[i].poster_path,
                ReleaseDate: json.cast[i].release_date,
                Summery: json.cast[i].overview
            };


            alleFilms.push(film); //eerst lokaal opslaan voor de snelheidswenst bij de interactie met de gebruiker

        }

        let movieLijst = document.getElementById("LijstFilms");


        for (let i = 0; i < alleFilms.length; i++) {

            let PosterImage = alleFilms[i].PosterImage;

            if (PosterImage === 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/null') {

                PosterImage = 'images/noImageAvailable.jpg';

            }

            movieLijst.innerHTML += '<li id="' + alleFilms[i].Titel + '"><div><a href="#"><img src="' + PosterImage + '"</a></div> <h2><a href="#">' + alleFilms[i].Titel + '</a></h2></li>';
            /*Uitbreiding: <div id="moreInfo">'+alleFilms[i].Summery+'</div>*/


        }


    })


    /*stop*/
}


/*uitbreiding*/
/*
function summeryOnOff() {


    var status = document.getElementById("moreInfo");
    if (status.style.display === "none") {
        status.style.display = "block";
    } else {
        status.style.display = "none";
    }

}
*/


/*Movies*/
