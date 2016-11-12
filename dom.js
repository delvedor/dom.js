/* globals Image */

'use strict'

;(function (global) {
  function Dom (selector) {
    if (!(this instanceof Dom)) {
      return new Dom(selector)
    }
    this.element = document.querySelector(selector)
    return this
  }

  Dom.get = function (selector) {
    return document.querySelector(selector)
  }

  Dom.prototype.parent = function (element) {
    return this.element.parentNode
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
    return this.element.classList
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
      return this.element.innerText
    }
    this.element.innerText = text
    return this
  }

  Dom.prototype.html = function (html) {
    if (!html) {
      return this.element.innerHTML
    }
    this.element.innerHTML = html
    return this
  }

  Dom.prototype.clone = function (element, deep) {
    return this.element.cloneNode(deep || false)
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

  global.dom = Dom
})(window)
