/* globals Image, HTMLElement */

'use strict'

;(function (global) {
  function Dom (selector) {
    if (!(this instanceof Dom)) {
      return new Dom(selector)
    }

    if (typeof selector === 'string') {
      this.element = document.querySelector(selector)
    } else if (selector instanceof HTMLElement) {
      this.element = selector
    } else {
      throw new TypeError('Selector must be a string or an HTMLElement')
    }

    return this
  }

  Dom.prototype.parent = function (element) {
    return new Dom(this.element.parentNode)
  }

  Dom.prototype.remove = function (element) {
    return this.element.parentNode.removeChild(this.element)
  }

  Dom.prototype.replace = function (newEle, oldEle) {
    this.element.replaceChild(newEle, oldEle)
    return this
  }

  Dom.prototype.append = function (element) {
    this.element.appendChild(element)
    return this
  }

  Dom.prototype.css = function (property, value) {
    this.element.style[property] = value
    return this
  }

  Dom.prototype.removeClass = function (className) {
    this.element.classList.remove(className)
    return this
  }

  Dom.prototype.addClass = function (className) {
    this.element.classList.add(className)
    return this
  }

  Dom.prototype.classList = function () {
    var classList = []
    for (var ele in this.element.classList) {
      classList.push(this.element.classList[ele])
    }
    return classList
  }

  Dom.prototype.toggleClass = function (className) {
    this.element.classList.toggle(className)
    return this
  }

  Dom.prototype.removeChildren = function () {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild)
    }
    return this
  }

  Dom.prototype.on = function (eventName, callback) {
    this.element.addEventListener(eventName, callback.bind(this))
    return this
  }

  Dom.prototype.text = function (text) {
    if (!text) {
      return this.element.textContent
    }
    this.element.textContent = text
    return this
  }

  Dom.prototype.html = function (html) {
    if (!html) {
      return this.element.innerHTML
    }
    this.element.innerHTML = html
    return this
  }

  Dom.prototype.clone = function (deep) {
    return this.element.cloneNode(deep || false)
  }

  Dom.get = function (selector) {
    if (typeof selector !== 'string') {
      throw new TypeError('Selector must be a string')
    }
    return document.querySelector(selector)
  }

  Dom.parse = function (html) {
    var temp = document.createElement('TEMPLATE')
    temp.innerHTML = html
    return temp.content
  }

  Dom.image = function (path, alt) {
    var image = new Image()
    image.src = path
    image.alt = alt || ''
    return image
  }

  Dom.prototype.fadeIn = function (element, display) {
    this.element.style.opacity = 0
    this.element.style.display = display || 'block'
    ;(function fade () {
      var val = parseFloat(this.element.style.opacity)
      if (!((val += 0.1) > 1)) {
        this.element.style.opacity = val
        window.requestAnimationFrame(fade)
      }
    })()
  }

  Dom.prototype.fadeOut = function (element) {
    this.element.style.opacity = 1
    ;(function fade () {
      if ((this.element.style.opacity -= 0.1) < 0) {
        this.element.style.display = 'none'
      } else {
        window.requestAnimationFrame(fade)
      }
    })()
  }

  global.dom = Dom
})(window)
