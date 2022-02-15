export class Modal {
    constructor(movie, element) {
        this.movie = movie;
        this.element = element;
    }

    get_list(array) {
        let iterations = array.length;
        let result = "";
        for (const element of array) {
            if (!--iterations) {
                result += `${element}`;
            } else {
                result += `${element}, `;
            }
        }
        return result
    }

    create_title() {
        let el_title = this.element.querySelectorAll(".movie_title")[0];
        // let array_dp = this.movie.date_published.split('-');
        // let date_published = `${array_dp[2]}/${array_dp[1]}/${array_dp[0]}`;
        let year = this.movie.year;
        el_title.textContent = `${this.movie.title} [${year}]`;
    }

    create_countries() {
        let el_create_countries = this.element.querySelectorAll(".movie_countries")[0];
        let txt_countries = this.get_list(this.movie.countries);
        el_create_countries.querySelectorAll("span")[1].textContent = txt_countries;
    }

    create_cover() {
        let el_img = this.element.querySelectorAll("img")[0];
        el_img.setAttribute("src", this.movie.image_url);
        el_img.setAttribute("alt", this.movie.title);
    }

    create_directors() {
        let el_directors = this.element.querySelectorAll(".movie_directors")[0];
        let txt = this.get_list(this.movie.directors);
        el_directors.querySelectorAll("span")[1].textContent = txt;
    }

    create_rated() {
        let el_rated = this.element.querySelectorAll(".movie_rated")[0];
        el_rated.querySelectorAll("span")[1].textContent = this.movie.avg_vote;
    }

    create_imdb_score() {
        let el_imdb_score= this.element.querySelectorAll(".movie_imdb_score")[0];
        el_imdb_score.querySelectorAll("span")[1].textContent= this.movie.imdb_score;
    }

    create_duration() {
        let el_duration = this.element.querySelectorAll(".movie_duration")[0];
        let hours = Math.floor(this.movie.duration / 60);
        let minutes  = this.movie.duration % 60;
        if(minutes < 10) {
            minutes = "0"+minutes;

        }
        el_duration.querySelectorAll("span")[1].textContent = `${hours}:${minutes}`;
    }

    create_genres() {
        let el_genre = this.element.querySelectorAll(".movie_genres")[0];
        let txt_genre = this.get_list(this.movie.genres);
        el_genre.textContent = txt_genre;
    }

    create_worldwide_gross_income() {
        let el_movie_worldwide_gross_income = this.element.querySelectorAll(".movie_worldwide_gross_income")[0];
        el_movie_worldwide_gross_income.querySelectorAll("span")[1].textContent= this.movie.worldwide_gross_income;
    }

    create_actors() {
        let el_actors = this.element.querySelectorAll(".movie_actors")[0];
        el_actors.querySelectorAll("span")[1].textContent = this.get_list(this.movie.actors);
    }

    create_long_description() {
        let el_long_description = this.element.querySelectorAll(".movie_long_description")[0];
        el_long_description.querySelectorAll("span")[1].textContent = this.movie.long_description;
    }

    create_modal() {
        this.create_title();
        this.create_cover();
        this.create_genres();
        this.create_directors();
        this.create_duration();
        this.create_countries();
        this.create_rated();
        this.create_imdb_score();
        this.create_worldwide_gross_income();
        this.create_actors();
        this.create_long_description();
    }

    add_btn(element) {
        let close_btn = element.getElementsByClassName("close")[0];
        close_btn.onclick = function() {
            element.style.display = "none";
        }
    }
}