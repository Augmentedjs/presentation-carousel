describe("Given Presentation Carousel", () => {
  let view = null;
  describe("with an instance of View", () => {
    beforeEach(() => {
      view = new Carousel.ImageCarouselView();
    });

    afterEach(() => {
      //view.remove();
      view = null;
    });

    it("is defined", async () => {
      expect(Carousel.ImageCarouselView).to.not.be.undefined;
    });
    it("can create an instance", () => {
      expect(view).to.not.be.undefined;
    });
  });

});
