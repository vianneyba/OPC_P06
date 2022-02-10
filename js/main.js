import * as carousel from "./carousel.js";
import * as modal from "./modal.js";

const url_base = "http://127.0.0.1/";
const url = `${url_base}api/v1/titles/`;
const url_genre = `${url_base}api/v1/genres/`;
const url_by_imdb_score = `${url}?sort_by=-imdb_score`;
const options = {'visible': 4, 'nbr_movie': 7}
const genres = ["Thriller", "Adventure", "Romance"];

let carousel_div = document.getElementsByClassName('carousel');
let modal_div = document.querySelector('#myModal');
modal_div.style.display = "none";

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
    while (movies.length < options['nbr_movie']) {
        let response = await get_request(url+page+i);
        for(let movie of response.results){
            if(movies.length < options['nbr_movie']) {
                movies.push(movie);
            }
        }
        i++;
        if(!response.next){
            break;
        }
    }
    return movies;
}

const get_genre = async (url) => {
    let genres = [];
    url = url
    let response = null;
    do {
        response = await get_request(url);
        url = response.next;
        for(let genre of response.results) {
            genres.push(genre.name)
        }

    }while(response.next != null);

    return genres;
}

function get_modal_by_movie(id) {
    get_request(`${url}${id}`).then(
        movie => {
            modal_div.style.display = "block";
            let new_modal = new modal.Modal(movie, modal_div);
            new_modal.create_modal();
            new_modal.add_btn(modal_div);
        }
    );
}

function add_image_event_click(element) {
    let el_covers = element.querySelectorAll('img');
    for (let el_cover of el_covers){
        el_cover.addEventListener("click", ()=>{
            window.scrollTo(0, 0);
            let id = el_cover.getAttribute("id_movie");
            get_modal_by_movie(id);
        });
    }
}

let best_film_button = document.querySelectorAll('.best_film_button')[0];
best_film_button.addEventListener("click", ()=>{
    let id = best_film_button.getAttribute("id_movie");
    get_modal_by_movie(id);
});

let best_movies = get_movies(url_by_imdb_score);
best_movies.then(
    response => {
        new carousel.Carousel(response, carousel_div[0], "Films les mieux notés", options)
        add_image_event_click(carousel_div[0]);
        let best_film = response[0];
        best_film = get_request(best_film.url)
        best_film.then(
            response => {
                let best_film_button = document.querySelectorAll('.best_film_button')[0];
                best_film_button.setAttribute("id_movie", response.id);
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

let select_genres = async () => {
    let result = [];
    await get_genre(url_genre).then(
        response => {
            let i = 0;
            while(i < (carousel_div.length - 1)) {
                let genre = response[Math.floor(Math.random() * response.length)];
                if (result.find(el => el === genre) == undefined) {
                    result.push(genre);
                    i++;
                }
            }
        }
    );
    return result;
}

if (typeof genres === 'undefined') {
    select_genres().then(
        response => {
            let i = 1;
            for(const genre of response) {
                get_movies(`${url}?genre=${genre}`).then(
                    response => {
                        new carousel.Carousel(response, carousel_div[i], genre, options)
                        add_image_event_click(carousel_div[i]);
                        i++;
                    }
                    
                );
            }
        }
    );         
} else {
    let i = 1;
    for(const genre of genres) {
        get_movies(`${url}?genre=${genre}`).then(
            response => {
                new carousel.Carousel(response, carousel_div[i], genre, options)
                add_image_event_click(carousel_div[i]);
                i++;
            }
            
        );
    }       
}