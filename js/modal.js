export class Modal {
    constructor(movie, element) {
        this.movie = movie;
        this.element = element;
    }

    create_title() {
        let el_title = this.element.querySelectorAll(".movie_title")[0];
        let array_dp = this.movie.date_published.split('-');
        let date_published = `${array_dp[2]}/${array_dp[1]}/${array_dp[0]}`;
        el_title.textContent = `${this.movie.title} ${date_published}`;
    }

    create_cover() {
        let el_img = this.element.querySelectorAll("img")[0];
        el_img.setAttribute("src", this.movie.image_url);
        el_img.setAttribute("alt", this.movie.title);
    }

    create_directors() {
        let el_directors = this.element.querySelectorAll(".movie_directors")[0];
        el_directors.textContent = this.movie.directors;
    }

    create_duration() {
        let el_duration = this.element.querySelectorAll(".movie_duration")[0];
        let hours = Math.floor(this.movie.duration / 60);
        let minutes  = this.movie.duration % 60;
        el_duration.textContent = `${hours}:${minutes}`;
    }

    create_genres() {
        let el_genre = this.element.querySelectorAll(".movie_genres")[0];
        let iterations = this.movie.genres.length;
        let txt_genre = ""
        for (const genre of this.movie.genres) {
            if (!--iterations) {
                txt_genre += `${genre}`;
            } else {
                txt_genre += `${genre}, `;
            }
        }
        el_genre.textContent = txt_genre;
    }

    create_modal() {
        this.create_title();
        this.create_cover();
        this.create_genres();
        this.create_directors();
        this.create_duration();
    }

    add_btn(element) {
        let close_btn = element.getElementsByClassName("close")[0];
        close_btn.onclick = function() {
            element.style.display = "none";
          }
    }
}