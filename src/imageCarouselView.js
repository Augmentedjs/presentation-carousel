import { DirectiveView } from "presentation-decorator";
import css from "./styles/carousel.scss";

/**
 * Image Carousel View - Simple scrolling image carousel
 * @extends DirectiveView
 */
class ImageCarouselView extends DirectiveView {
  constructor(options) {
    super(options);
    if (options && options.images) {
      //console.debug(options.images);
      this._location = 0;

      this.template = /*html*/`
        <div class="carousel">
          <button data-${this.name}="left" data-click="left" class="left">
            <i class="material-icons">navigate_before</i>
          </button>
          <div>
            ${ options.images.map( (image) => {
                return `<figure><img src="${image.src}" alt="${image.value}" title="${image.caption}" /></figure>`;
              })
              .join("")
            }
          </div>
          <button data-${this.name}="right" data-click="right" class="right">
            <i class="material-icons">navigate_next</i>
          </button>
        </div>
      `;
      this._images = options.images;
      this.value = this._images[this._location].value;
    } else {
      this.template = /*html*/`<div class="carousel"><p>Empty</p></div>`;
      this._images = [];
      this.value = null;
    }
  };

  set value(value) {
    return this.model.set(this.name, value);
  };

  get value() {
    return this.model.get(this.name);
  };

  _changePosition(x) {
    if (this._carousel && this._firstimg) {
      const size = this._firstimg.offsetWidth;
      const trans = (this._location * size) / 16;
      //console.debug(size, trans);
      //console.debug(this._carousel);

      this._carousel.style.transform = `translateX(-${trans}rem)`;
      this.value = this._images[this._location].value;

      //console.debug("value", this._value);
    }
  };

  left(e) {
    e.preventDefault();
    //console.debug("left", this._location, this._images.length);
    if (this._location !== 0) {
      // const carousel = document.querySelector(`${this.el} > div.carousel > div`);
      // const img = document.querySelector(`${this.el} > div.carousel > div > figure`);
      if (this._carousel && this._firstimg) {
        this._location--;
        this._changePosition();
      }
    }
    return false;
  };

  right(e) {
    e.preventDefault();
    //console.debug("right", this._location, this._images.length);
    if (this._location !== this._images.length - 1) {
      // const carousel = document.querySelector(`${this.el} > div.carousel > div`);
      // const img = document.querySelector(`${this.el} > div.carousel > div > figure`);
      if (this._carousel && this._firstimg) {
        this._location++;
        this._changePosition();
      }
    }
    return false;
  };

  async render() {
    await super.render();
    this._carousel = await document.querySelector(`${this.el} > div.carousel > div`);
    this._firstimg = await document.querySelector(`${this.el} > div.carousel > div > figure`);
    this._carousel.style.width = `${this._images.length}00%`;
    this.delegateEvents();
    return this;
  };

  async remove() {
    return await super.remove();
  };
};

export default ImageCarouselView;
