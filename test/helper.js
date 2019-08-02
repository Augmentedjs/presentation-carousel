const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = (new JSDOM('<!doctype html><html><body><div id="carousel"></div></body></html>')).window;

global.document = dom.document;
global.window = dom.window;
global.navigator = {
  userAgent: 'node.js'
};

global.Carousel = require("../dist/presentation-carousel.js");

const chai = require("chai");
global.chai = chai;
global.expect = chai.expect;
