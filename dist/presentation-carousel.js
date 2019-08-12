!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("presentation-decorator")):"function"==typeof define&&define.amd?define("presentation-carousel",["presentation-decorator"],e):"object"==typeof exports?exports["presentation-carousel"]=e(require("presentation-decorator")):t["presentation-carousel"]=e(t["presentation-decorator"])}(this,function(t){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=0)}([function(t,e,n){"use strict";var i,o=n(1),r=(i=o)&&i.__esModule?i:{default:i};t.exports.ImageCarouselView=r.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,o=n(2),r=n(3);(i=r)&&i.__esModule;e.default=class extends o.DirectiveView{constructor(t){t||(t={}),super(t),this.showCaption=!t.showCaption||t.showCaption,t&&t.images?(this._location=t.position?t.position:0,this.template=`\n        <div class="carousel">\n          <button data-${this.name}="left" data-click="left" class="left">\n            <i class="material-icons">navigate_before</i>\n          </button>\n          <div>\n            ${t.images.map(t=>`<figure><img src="${t.src}" alt="${t.value}" ${this.showCaption?`title="${t.caption}"`:""}/></figure>`).join("")}\n          </div>\n          ${this.showCaption?`<p id="${this.name+"_carousel_caption"}" class="caption"></p>`:""}\n          <button data-${this.name}="right" data-click="right" class="right">\n            <i class="material-icons">navigate_next</i>\n          </button>\n        </div>\n      `,this._images=t.images,this.model.set(this.name,this._images[this._location].value)):(this.template='<div class="carousel"><p>Empty</p></div>',this._images=[])}changed(t){return!0}set value(t){return this.changed(t),this.model.set(this.name,t)}get value(){return this.model.get(this.name)}get length(){return this._images.length}get position(){return this._location}set position(t){t&&(this._location=t,this._changePosition())}_changePosition(){if(this._carousel&&this._firstimg){const t=this._firstimg.offsetWidth,e=this._location*t/16;this._carousel.style.transform=`translateX(-${e}rem)`,this.value=this._images[this._location].value,this.showCaption&&this._caption&&(this._caption.innerHTML=this._images[this._location].caption)}}left(t){return t&&t.preventDefault(),0!==this._location&&this._carousel&&this._firstimg&&(this._location--,this._changePosition()),!1}right(t){return t&&t.preventDefault(),this._location!==this._images.length-1&&this._carousel&&this._firstimg&&(this._location++,this._changePosition()),!1}async render(){await super.render(),this._container=await document.querySelector(`${this.el} > div.carousel`),this._carousel=await document.querySelector(`${this.el} > div.carousel > div`),this._firstimg=await document.querySelector(`${this.el} > div.carousel > div > figure`),this._caption=await document.querySelector(`${this.el} > div.carousel > #${this.name}_carousel_caption`);const t=this._firstimg.offsetWidth/16;return this._container.style.width=`${t}rem`,this._carousel.style.width=`${t*this._images.length+.5}rem`,this._carousel.style.height=this._firstimg.offsetHeight,await this.delegateEvents(),this.value=this.value,this._changePosition(),this}async remove(){return await super.remove()}}},function(e,n){e.exports=t},function(t,e,n){var i=n(4);"string"==typeof i&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1};n(6)(i,o);i.locals&&(t.exports=i.locals)},function(t,e,n){(t.exports=n(5)(!0)).push([t.i,".carousel {\n  display: block;\n  position: relative;\n  border: 1px solid rgba(0, 0, 0, 0.85);\n  box-shadow: 0.25rem 0.25rem 0.25rem black;\n  overflow: hidden;\n  margin: 0 auto !important; }\n  .carousel button {\n    width: 2rem;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    font-size: 1rem;\n    color: var(--light-text);\n    background-color: rgba(0, 0, 0, 0.1);\n    top: 0;\n    border: none;\n    box-shadow: none;\n    border-radius: 0;\n    z-index: 1; }\n    .carousel button i.material-icons {\n      font-size: 2rem; }\n    .carousel button.left {\n      position: absolute;\n      left: 0; }\n    .carousel button.right {\n      position: absolute;\n      right: 0; }\n  .carousel div {\n    display: inline-block;\n    vertical-align: top;\n    transition: transform 0.5s;\n    height: 100%;\n    margin: 0; }\n  .carousel figure {\n    display: inline-block;\n    position: relative;\n    vertical-align: top;\n    margin: 0; }\n  .carousel p {\n    padding: 0.25rem;\n    margin: 0;\n    font-size: 0.75rem;\n    color: var(--light-text);\n    background-color: rgba(0, 0, 0, 0.2);\n    z-index: 1;\n    overflow: hidden; }\n","",{version:3,sources:["/Users/doctor/Documents/workspace/presentation-carousel/src/styles/carousel.scss"],names:[],mappings:"AAAA;EACE,cAAc;EACd,kBAAkB;EAClB,qCAAkC;EAClC,yCAAyC;EACzC,gBAAgB;EAChB,yBAAyB,EAAA;EAN3B;IASI,WAAW;IACX,YAAY;IACZ,SAAS;IACT,UAAU;IACV,eAAe;IACf,wBAAwB;IACxB,oCAAiC;IACjC,MAAM;IACN,YAAY;IACZ,gBAAgB;IAChB,gBAAgB;IAChB,UAAU,EAAA;IApBd;MAuBM,eAAe,EAAA;IAvBrB;MA2BM,kBAAkB;MAClB,OAAO,EAAA;IA5Bb;MAgCM,kBAAkB;MAClB,QAAQ,EAAA;EAjCd;IAsCI,qBAAqB;IACrB,mBAAmB;IACnB,0BAA0B;IAC1B,YAAY;IACZ,SAAS,EAAA;EA1Cb;IA8CI,qBAAqB;IACrB,kBAAkB;IAClB,mBAAmB;IACnB,SAAS,EAAA;EAjDb;IAqDI,gBAAgB;IAChB,SAAS;IACT,kBAAkB;IAClB,wBAAwB;IACxB,oCAAiC;IACjC,UAAU;IACV,gBAAgB,EAAA",file:"carousel.scss",sourcesContent:[".carousel {\n  display: block;\n  position: relative;\n  border: 1px solid rgba(0,0,0,0.85);\n  box-shadow: 0.25rem 0.25rem 0.25rem black;\n  overflow: hidden;\n  margin: 0 auto !important;\n\n  button {\n    width: 2rem;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    font-size: 1rem;\n    color: var(--light-text);\n    background-color: rgba(0,0,0,0.1);\n    top: 0;\n    border: none;\n    box-shadow: none;\n    border-radius: 0;\n    z-index: 1;\n\n    i.material-icons {\n      font-size: 2rem;\n    }\n\n    &.left {\n      position: absolute;\n      left: 0;\n    }\n\n    &.right {\n      position: absolute;\n      right: 0;\n    }\n  }\n\n  div {\n    display: inline-block;\n    vertical-align: top;\n    transition: transform 0.5s;\n    height: 100%;\n    margin: 0;\n  }\n\n  figure {\n    display: inline-block;\n    position: relative;\n    vertical-align: top;\n    margin: 0;\n  }\n\n  p {\n    padding: 0.25rem;\n    margin: 0;\n    font-size: 0.75rem;\n    color: var(--light-text);\n    background-color: rgba(0,0,0,0.2);\n    z-index: 1;\n    overflow: hidden;\n  }\n}\n"]}])},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=(a=i,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),r=i.sources.map(function(t){return"/*# sourceURL=".concat(i.sourceRoot).concat(t," */")});return[n].concat(r).concat([o]).join("\n")}var a,s,l;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];null!=r&&(i[r]=!0)}for(var a=0;a<t.length;a++){var s=t[a];null!=s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),e.push(s))}},e}},function(t,e,n){"use strict";var i,o={},r=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},a=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}();function s(t,e){for(var n=[],i={},o=0;o<t.length;o++){var r=t[o],a=e.base?r[0]+e.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}function l(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=o[i.id],a=0;if(r){for(r.refs++;a<r.parts.length;a++)r.parts[a](i.parts[a]);for(;a<i.parts.length;a++)r.parts.push(A(i.parts[a],e))}else{for(var s=[];a<i.parts.length;a++)s.push(A(i.parts[a],e));o[i.id]={id:i.id,refs:1,parts:s}}}}function c(t){var e=document.createElement("style");if(void 0===t.attributes.nonce){var i=n.nc;i&&(t.attributes.nonce=i)}if(Object.keys(t.attributes).forEach(function(n){e.setAttribute(n,t.attributes[n])}),"function"==typeof t.insert)t.insert(e);else{var o=a(t.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}return e}var u,d=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function h(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=d(e,o);else{var r=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}var f=null,p=0;function A(t,e){var n,i,o;if(e.singleton){var r=p++;n=f||(f=c(e)),i=h.bind(null,n,r,!1),o=h.bind(null,n,r,!0)}else n=c(e),i=function(t,e,n){var i=n.css,o=n.media,r=n.sourceMap;if(o&&t.setAttribute("media",o),r&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}.bind(null,n,e),o=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else o()}}t.exports=function(t,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=r());var n=s(t,e);return l(n,e),function(t){for(var i=[],r=0;r<n.length;r++){var a=n[r],c=o[a.id];c&&(c.refs--,i.push(c))}t&&l(s(t,e),e);for(var u=0;u<i.length;u++){var d=i[u];if(0===d.refs){for(var h=0;h<d.parts.length;h++)d.parts[h]();delete o[d.id]}}}}}])});
//# sourceMappingURL=presentation-carousel.js.map