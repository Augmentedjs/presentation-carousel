const OPTIONS = {
  "el": "#carousel",
  "images": [
    {
      "src": "someuri",
      "value": "x",
      "caption": "This is X"
    },
    {
      "src": "someuri",
      "value": "y",
      "caption": "This is Y"
    },
    {
      "src": "someuri",
      "value": "z",
      "caption": "This is Z"
    }
  ]
};

describe("Given Presentation Carousel", () => {
  let view = null;
  describe("with an instance", () => {
    beforeEach(() => {
      view = new Carousel.ImageCarouselView(OPTIONS);
    });

    afterEach(() => {
      view.remove();
      view = null;
    });

    it("is defined", async () => {
      expect(Carousel.ImageCarouselView).to.not.be.undefined;
    });
    it("can create an instance", () => {
      expect(view).to.not.be.undefined;
    });

    it("has a bunch of 'images' passed", async () => {
      expect(view.length).to.equal(3);
    });

    it("has a starting value", async () => {
      expect(view.value).to.equal("x");
    });

    it("has a starting position", async () => {
      expect(view.position).to.equal(0);
    });

    it("can move to the right", async () => {
      const v = await view.render();
      const r = await view.right();
      expect(view.position).to.equal(1);
    });

    it("won't move to the left from start", async () => {
      const v = await view.render();
      const r = await view.left();
      expect(view.position).to.equal(0);
    });
  });

});
