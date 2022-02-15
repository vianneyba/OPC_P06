export class Carousel {
    constructor(movies, element, type, options) {
        this.movies = movies;
        this.options = options;
        this.element = element;
        this.type = type;
        this.position = -1;
        this.create_title();
        this.create_cover();
        this.add_btn_event_click();
        this.delete_buttons();
    }

    delete_buttons() {
        if( this.movies.length < this.options['visible'] + 1) {
            let el_previous_button = this.element.querySelectorAll(".carousel__btn_previous");
            el_previous_button[0].remove();
            let el_next_button = this.element.querySelectorAll(".carousel__btn_next");
            el_next_button[0].remove();
        }
    }

    create_title() {
        let el_title = this.element.querySelector('h1');
        el_title.textContent = this.type;
    }

    create_cover() {
        let div_cover = this.element.querySelector('.carousel__cover');
        for(let x = 0; x < this.options['visible']; x++) {
            if(this.movies[x]) {
                let el_img = document.createElement("img");
                el_img.setAttribute("src", this.movies[x].image_url);
                el_img.setAttribute("alt", this.movies[x].title);
                el_img.setAttribute("id_movie", this.movies[x].id);
                div_cover.appendChild(el_img);
            }
        }
    }

    change_cover(direction) {
        if (direction === "left") {
            this.position = this.previous_position(this.position);
        }
        else if (direction === "right") {
            this.position = this.next_position(this.position);
        }

        let pictures = this.element.querySelectorAll("img");
        let i = this.position;
        for (let picture of pictures) {
            picture.setAttribute("src", this.movies[i].image_url);
            picture.setAttribute("alt", this.movies[i].title);
            picture.setAttribute("id_movie", this.movies[i].id);
            i = this.next_position(i);
        }
    }

    add_btn_event_click() {
        let btn_previous = this.element.querySelector('.carousel__btn_previous');
        let btn_next = this.element.querySelector('.carousel__btn_next');
        btn_previous.addEventListener("click", () => {
            this.move_left();
        })
        btn_next.addEventListener("click", () => {
            this.move_right();
        })
    }

    previous_position(i) {
        if (i == -1 || i == 0) { 
            return this.options['nbr_movie'] - 1;
        } else {
            return (i - 1) % this.options['nbr_movie'];
        }
    }

    next_position(i) {
        if (i === -1) { 
            return 1;
        } else {
            return (i + 1) % this.options['nbr_movie'];
        }
    }

    move_left() {
        this.change_cover("left");
    }

    move_right() {
        this.change_cover("right");
    }
}