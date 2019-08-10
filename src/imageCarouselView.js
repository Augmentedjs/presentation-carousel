import { DirectiveView } from "presentation-decorator";
import css from "./styles/carousel.scss";

/**
 * Image Carousel View - Simple scrolling image carousel<br/>
 * Pass an array of objects as an "images" option.  See example.<br/>
 * Note that the first image will determine the size of each "block" the carousel with scroll to.
 * @example
 * const ic = new ImageCarouselView({ "images": [ { "src": "uri", "value": "xyz", "caption": "This is a cool image" }, ... ] });
 * @extends DirectiveView
 */
class ImageCarouselView extends DirectiveView {
  constructor(options) {
    super(options);
    if (options && options.images) {
      //console.debug(options.images);
      this._location = (options.position) ? options.position : 0;

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
      this.model.set(this.name, this._images[this._location].value);
      // this._value = this._images[this._location].value;
    } else {
      this.template = /*html*/`<div class="carousel"><p>Empty</p></div>`;
      this._images = [];
    }
  };

  /**
   * Is called when the carousel is changed.
   */
  changed(value) {
    return true;
  };

  /**
   * @property value
   * The value of the carousel.  Also calls user overridable callback "changed"
   */

  set value(value) {
    this.changed(value);
    return this.model.set(this.name, value);
  };

  get value() {
    return this.model.get(this.name);
  };

  /*
   * The length of the carousel
   * @property length
   */
  get length() {
    return this._images.length;
  };

  /**
   * @property position
   * The position of the carousel.
   */
  get position() {
   return this._location;
  };

  /**
   * @property position
   * The position of the carousel.
   */
  set position(p) {
    this._location = p;
    this._changePosition();
  };

  _changePosition() {
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

  /**
   * moves the carousel to the left
   */
  left(e) {
    if (e) {
      e.preventDefault();
    }
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

  /**
   * moves the carousel to the right
   */
  right(e) {
    if (e) {
      e.preventDefault();
    }
    //console.debug("right", this._location, this._images.length);
    //console.debug("_carousel", this._carousel, "_firstimg", this._firstimg);
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
    this.value = this.value;
    this._changePosition();
    return this;
  };

  async remove() {
    return await super.remove();
  };
};

export default ImageCarouselView;
