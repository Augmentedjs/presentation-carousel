import { DirectiveView } from "presentation-decorator";
import css from "./styles/carousel.scss";

/**
 * Image Carousel View - Simple scrolling image carousel<br/>
 * Pass an array of objects as an "images" option.<br/>
 * Supports the following options:<br/>
 * <ul>
 * <li>showCaption - Shows the caption</li>
 * <li>postion - starting position</li>
 * <li>images - image array with the following format: <code>[{ src: "", value: "", caption: "" }]</code></li>
 * </ul>
 * <em>* Note that the first image will determine the size of each "block" size the carousel will scroll with.</em>
 * @example
 * const ic = new ImageCarouselView({ "images": [ { "src": "uri", "value": "xyz", "caption": "This is a cool image" }, ... ] });
 * @extends DirectiveView
 */
class ImageCarouselView extends DirectiveView {
  constructor(options) {
    if (!options) {
      options = {};
    }
    super(options);
    this.showCaption = ((options.showCaption) ? options.showCaption : true);

    if (options && options.images) {
      this._location = (options.position) ? options.position : 0;

      this.template = /*html*/`
        <div class="carousel">
          <button data-${this.name}="left" data-click="left" class="left">
            <i class="material-icons">navigate_before</i>
          </button>
          <div>
            ${ options.images.map( (image) => {
                return `<figure><img src="${image.src}" alt="${image.value}" ${(this.showCaption) ? `title="${image.caption}"` : ""}/></figure>`;
              })
              .join("")
            }
          </div>
          ${(this.showCaption) ? `<p id="${this.name + "_carousel_caption"}" class="caption"></p>` : ""}
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
   * @param {String} value passed to the method
   */
  changed(value) {
    return true;
  };

  /**
   * @property {Number} value
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
   * @property {Number} length
   */
  get length() {
    return this._images.length;
  };

  /**
   * @property {Number} position
   * The position of the carousel.
   */
  get position() {
   return this._location;
  };

  set position(p) {
    if (p) {
      this._location = p;
      this._changePosition();
    }
  };

  _changePosition() {
    if (this._carousel && this._firstimg) {
      const size = this._firstimg.offsetWidth;
      const trans = (this._location * size) / 16;
      this._carousel.style.transform = `translateX(-${trans}rem)`;
      //this._carousel.style.width = size;
      this.value = this._images[this._location].value;
      if (this.showCaption && this._caption) {
        this._caption.innerHTML = this._images[this._location].caption;
      }
    }
  };

  /**
   * moves the carousel to the left
   */
  left(e) {
    if (e) {
      e.preventDefault();
    }
    if (this._location !== 0) {
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
    if (this._location !== this._images.length - 1) {
      if (this._carousel && this._firstimg) {
        this._location++;
        this._changePosition();
      }
    }
    return false;
  };

  async render() {
    await super.render();
    this._container = await document.querySelector(`${this.el} > div.carousel`);
    this._carousel = await document.querySelector(`${this.el} > div.carousel > div`);
    this._firstimg = await document.querySelector(`${this.el} > div.carousel > div > figure`);
    this._caption = await document.querySelector(`${this.el} > div.carousel > #${this.name}_carousel_caption`);

    const size = this._firstimg.offsetWidth;
    const trans = size / 16;

    this._container.style.width = `${trans}rem`;
    this._carousel.style.width = `${trans * this._images.length + 0.5}rem`;
    this._carousel.style.height = this._firstimg.offsetHeight;
    await this.delegateEvents();
    this.value = this.value;
    this._changePosition();
    return this;
  };

  async remove() {
    return await super.remove();
  };
};

export default ImageCarouselView;
