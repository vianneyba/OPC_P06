import * as carousel from "./carousel.js";
import * as modal from "./modal.js";

const url = "http://127.0.0.1/api/v1/titles/";
const url_genre = "http://127.0.0.1/api/v1/genres/"
const url_by_imdb_score = `${url}?sort_by=-imdb_score`

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
    while (movies.length < 7) {
        let response = await get_request(url+page+i);
        for(let movie of response.results){
            if(movies.length < 7) {
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

function add_image_event_click(element) {
    let el_covers = element.querySelectorAll('img');
    for (let el_cover of el_covers){
        el_cover.addEventListener("click", ()=>{
            let id = el_cover.getAttribute("id_movie");
            get_request(`${url}${id}`).then(
                movie => {
                    modal_div.style.display = "block";
                    let new_modal = new modal.Modal(movie, modal_div);
                    new_modal.create_modal();
                    new_modal.add_btn(modal_div);

                }
            )
        });
    }
}

function add_close_event_click() {
    let el_close_button = element.querySelectorAll('close')[0];
    el_close_button.addEventListener("click", ()=>{
        modal_div.style.display = "none";
    });
}

let best_movies = get_movies(url_by_imdb_score);
best_movies.then(
    response => {
        let el_carousel_one = document.querySelector('#carousel_one');
        new carousel.Carousel(response, {}, el_carousel_one, "Films les mieux notés")
        add_image_event_click(el_carousel_one);
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

select_genres().then(
    response => {
        // response = ["Reality-TV"];
        let i = 1;
        for(const genre of response) {
            get_movies(`${url}?genre=${genre}`).then(
                response => {
                    new carousel.Carousel(response, {}, carousel_div[i], genre)
                    add_image_event_click(carousel_div[i]);
                    i++;
                }

            );
        }
    }
)
