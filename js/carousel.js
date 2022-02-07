export class Carousel {
    constructor(movies, options, element, type) {
        this.movies = movies;
        this.options = options;
        this.element = element;
        this.type = type;
        this.position = 0;
        this.create_title();
        this.create_cover();
        this.add_btn_event_click();
        this.delete_buttons();
    }

    delete_buttons() {
        if( this.movies.length < 5) {
            let el_previous_button = this.element.querySelectorAll(".carousel__btn_previous");
            el_previous_button[0].remove();
            let el_next_button = this.element.querySelectorAll(".carousel__btn_next");
            el_next_button[0].remove();
        }
    }

    create_title() {
        let el_title = this.element.querySelector('h1');
        el_title.textContent = this.type
    }

    create_cover() {
        let div_cover = this.element.querySelector('.carousel__cover');
        let i = this.position;
        for(let x = 0; x < 4; x++) {
            if(this.movies[i]) {
                let el_img = document.createElement("img");
                el_img.setAttribute("src", this.movies[i].image_url);
                el_img.setAttribute("alt", this.movies[i].title);
                el_img.setAttribute("id_movie", this.movies[i].id);
                div_cover.appendChild(el_img);
                i = this.next_position(i);
            }
        }
    }

    change_cover(i, direction) {
        let pictures = this.element.querySelectorAll("img");
        for (let picture of pictures) {
            picture.setAttribute("src", this.movies[i].image_url);
            picture.setAttribute("alt", this.movies[i].title);
            i = this.next_position(i);
        }
        if (direction === "left") {
            this.position = this.previous_position(this.position);
        } else {
            this.position = this.next_position(this.position);
        }
    }

    add_btn_event_click() {
        let btn_previous = this.element.querySelector('.carousel__btn_previous');
        let btn_next = this.element.querySelector('.carousel__btn_next');
        btn_previous.addEventListener("click", () => {
            this.move_left();
        })
        btn_next.addEventListener("click", () => {
            this.move_right()
        })
    }

    previous_position(i) {
        if (i === 0) { 
            return 6;
        } 
        return (i - 1) % 7;
    }

    next_position(i) {
        return (i + 1) % 7;
    }

    move_left() {
        this.change_cover(this.next_position(this.position), "right");
    }

    move_right() {
        this.change_cover(this.previous_position(this.position), "left");
    }
}