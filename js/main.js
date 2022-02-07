import * as carousel from "./carousel.js";

const url = "http://127.0.0.1/api/v1/titles/";
const url_genre = "http://127.0.0.1/api/v1/genres/"
const url_by_imdb_score = `${url}?sort_by=-imdb_score`

const get_request = async (url) => {
    let response = await fetch(url)
    if (response.ok){
        return response.json();
    } else{
        return false;
    }
}

const get_movies = async (url) => {
    let i = 1;
    let page = "&page=";
    let movies = [];
    while (movies.length < 7) {
        let response = await get_request(url+page+i);
        for(let movie of response.results){
            if(movies.length < 7) {
                movies.push(movie);
            }
        }
        i++;
    }
    return movies;
}

let best_movies = get_movies(url_by_imdb_score);
best_movies.then(
    response => {
        let el_carousel_one = document.querySelector('#carousel_one');
        let carousel_one = new carousel.Carousel(response, {}, el_carousel_one, "Films les mieux notés")
        let best_film = response[0];
        best_film = get_request(best_film.url)
        best_film.then(
            response => {
                let best_film_title = document.querySelector('#best_film_title');
                best_film_title.innerHTML = response.title;
                let best_film_description = document.querySelector('#best_film_description');
                best_film_description.innerHTML = response.description;
                let best_film_cover = document.querySelector('#best_film_cover');
                best_film_cover.setAttribute("src", response.image_url)
            }
        )
    }
)