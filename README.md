# Dom.js
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/dom.js.svg?branch=master)](https://travis-ci.org/delvedor/dom.js) ![stability](https://img.shields.io/badge/stability-experimental-orange.svg)

Dom manipulation library, *super early alpha*.  
If you need to do a light and fast manipulation to some dom elements and you don't want to use jQuery, for both size and performances reasons, this library is for you!

## Install
`curl https://raw.githubusercontent.com/delvedor/dom.js/master/dom.js > dom.js`

## Usage
```html
<script src="./lib/dom.js"></script>
<!-- or -->
<script src="https://raw.githubusercontent.com/delvedor/dom.js/master/dom.js"></script>
```
Access the library via `dom()` or `$()`.  
Dom.js can live with jQuery without conflicts, if jQuery is already present in the dom, `$()` will not be overwritten.

Example of usage:
```js
dom('#element')
  .addClass('visible')
  .text('Hi there!')
  .css(`
    color: #fff;
    font-size: 1em;
    text-align: right;
  `)
```

## API
At the moment here are just listed the APIs, if you want to see how they work, just check the implementation, is pretty straightforward.

<a href="#"><code><b>dom(selector)</b></code></a>  

<a href="#"><code>dom(element)<b>.parent()</b></code></a>  


<a href="#"><code>dom(element)<b>.remove()</b></code></a>  


<a href="#"><code>dom(element)<b>.replace(newEle, oldEle)</b></code></a>  


<a href="#"><code>dom(element)<b>.append(element)</b></code></a>  


<a href="#"><code>dom(element)<b>.css(rule)</b></code></a>  


<a href="#"><code>dom(element)<b>.removeClass(className)</b></code></a>  


<a href="#"><code>dom(element)<b>.addClass(className)</b></code></a>  


<a href="#"><code>dom(element)<b>.classList()</b></code></a>  


<a href="#"><code>dom(element)<b>.toggleClass(className)</b></code></a>  


<a href="#"><code>dom(element)<b>.hasClass(className)</b></code></a>  


<a href="#"><code>dom(element)<b>.children(options)</b></code></a>  


<a href="#"><code>dom(element)<b>.on(eventName, callback)</b></code></a>  


<a href="#"><code>dom(element)<b>.off(eventName, callback)</b></code></a>  


<a href="#"><code>dom(element)<b>.is(what)</b></code></a>  


<a href="#"><code>dom(element)<b>.text(text)</b></code></a>  


<a href="#"><code>dom(element)<b>.html(html)</b></code></a>  


<a href="#"><code>dom(element)<b>.value(value)</b></code></a>  


<a href="#"><code>dom(element)<b>.attr(name, value)</b></code></a>  


<a href="#"><code>dom(element)<b>.removeAttr(name)</b></code></a>  


<a href="#"><code>dom(element)<b>.hasAttr(name)</b></code></a>  


<a href="#"><code>dom(element)<b>.test(regex)</b></code></a>  


<a href="#"><code>dom(element)<b>.clone(deep)</b></code></a>  


<a href="#"><code>dom(element)<b>.observe(options, callback)</b></code></a>  


<a href="#"><code>dom(element)<b>.removeObserver()</b></code></a>  


<a href="#"><code>dom(element)<b>.swipe(callback)</b></code></a>  


<a href="#"><code>dom(element)<b>.collapsible(options)</b></code></a>  
<a href="#"><code>|---<b> .expand()</b></code></a>  
<a href="#"><code>|---<b> .collapse()</b></code></a>  

### Utils

<a href="#"><code>dom<b>.get(selector)</b></code></a>  

<a href="#"><code>dom<b>.all(selector)</b></code></a>  


<a href="#"><code>dom<b>.ajax(options)</b></code></a>  


<a href="#"><code>dom<b>.parse(html)</b></code></a>  


<a href="#"><code>dom<b>.image(path, alt)</b></code></a>  


## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
**[MIT](https://github.com/delvedor/dom.js/blob/master/LICENSE)**

*The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.*

Copyright © 2017 Tomas Della Vedova
