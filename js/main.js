"use strict";

document.addEventListener('DOMContentLoaded', init);

/*Modal JS start*/

//modalElement
let modal = document.getElementById('simpleModal');
//modalButton
let modalBtn = document.getElementById('modalBtn');
//closeButton
let closeBtn = document.getElementById('closeBtn');


/*Modal JS end*/



let allCategories = [];
let alleFilms = [];

function init() {

    console.log(window.location.pathname);


    /*Check the specific page*/
    if (window.location.pathname === '/chuckitbyarno/index.html' || window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname === '/chuckitbyarno/' || window.location.pathname === '/chuckitbyarno.github.io/index.html') {

        getAllCategories();



    } else if (window.location.pathname === '/chuckitbyarno/movie.html' || window.location.pathname === '/movie.html'|| window.location.pathname === '/chuckitbyarno.github.io/movie.html') {


        getChuckMovies();
    }


    document.getElementById("getNewRandomQuote").addEventListener("click", getChuckRandomJoke);
    //  summeryOnOff();



    /*Modal Listener start*/

//listen for open click
    modalBtn.addEventListener('click', getListenersOnAllMovies);
//listen for close click
    closeBtn.addEventListener('click', closeModal);
//listen outside click to close
    window.addEventListener('click', clickOutside);

    /*Modal Listener end*/


}

/*Deze toevoegen ergens om automatisch te doen gebeuren voor enlke film een eigen listener met for lus bij het laden!*/
function getListenersOnAllMovies() {

    let films = document.querySelectorAll("#LijstFilms li");
    console.log(films);
    for (let i = 0; i<films.length;i++){

        films[i].addEventListener('click', openModal);

    }
    console.log("listeners added!");


}

function getChuckRandomJoke(e) {
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


        document.getElementById('QuoteCategorie').innerHTML = '<span>Category: </span>' + "Random joke category";

    });
}

function getAllCategories() {

    fetch('https://api.chucknorris.io/jokes/categories', {

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


    });


} //being done at start

function getJokeByCategorie(e) {
    e.preventDefault();

    let chosenCategorie = e.currentTarget.getAttribute('id');
    fetch('https://api.chucknorris.io/jokes/random?category=' + chosenCategorie, {
    headers: new Headers({

            'Accept': 'application/json'

        })
    }).then(function (response) {
        if (response.ok) return response.json();
        throw  new Error('Failed to return')

    }).then(function (json) {

        document.getElementById('GenQuotes').innerHTML = json.value;

        if (json.category === null) {

            document.getElementById('QuoteCategorie').innerHTML = '<span>Categorie: </span> ' + chosenCategorie;


        } else {

            document.getElementById('QuoteCategorie').innerHTML = '<span>Categorie: </span> ' + json.category;

        }


    })
}

function getChuckMovies() {


    /*Start*/

    fetch('https://api.themoviedb.org/3/person/51576/movie_credits?api_key=96eaa07b5e1250edb1f755f50f8e4336&language=en-US', {

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


    });

    /*stop*/
}





























/*Popup Window*/


//Function to open modal
function openModal(e) {
e.preventDefault();
    let SpecificMovie = e.path[3].id;

    for(let i = 0; i<alleFilms.length;i++){

        if(alleFilms[i].Titel === SpecificMovie){
            document.getElementById('MovieSummery').innerHTML = "<strong>"+alleFilms[i].Titel+"</strong>" + ": " + alleFilms[i].Summery;
        }

    }




    modal.style.display = 'block';

}

//Function to close modal
function closeModal(e) {
    e.preventDefault();
    modal.style.display = 'none';

}

//Function to close modal if clicked outside of the modal
function clickOutside(e) {
    if (e.target == modal) {

        modal.style.display = 'none';
    }
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
