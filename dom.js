/* eslint-disable new-cap */
/* globals Image */

'use strict'

window.dom = dom

function dom (selector) {
  if (!(this instanceof dom)) {
    return new dom(selector)
  }
  this.element = document.querySelector(selector)
  return this
}

dom.get = function (selector) {
  return document.querySelector(selector)
}

dom.prototype.getParent = function (element) {
  return this.element.parentNode
}

dom.prototype.remove = function(element) {
  return this.element.parentNode.removeChild(this.element)
}

dom.prototype.replace = function (newEle, oldEle) {
  this.element.replaceChild(newEle, oldEle)
  return this
}

dom.prototype.append = function (element) {
  this.element.appendChild(element)
  return this
}

dom.prototype.css = function (property, value) {
  this.element.style[property] = value
  return this
}

dom.prototype.removeClass = function (className) {
  this.element.classList.remove(className)
  return this
}

dom.prototype.addClass = function (className) {
  this.element.classList.add(className)
  return this
}

dom.prototype.classList = function () {
  return this.element.classList
}

dom.prototype.toggleClass = function (className) {
  this.element.classList.toggle(className)
  return this
}

dom.prototype.removeChildren = function () {
  while (this.element.firstChild) {
    this.element.removeChild(this.element.firstChild)
  }
  return this
}

dom.prototype.on = function (eventName, callback) {
  this.element.addEventListener(eventName, callback.bind(this))
  return this
}

dom.prototype.text = function (text) {
  if (!text) {
    return this.element.innerText
  }
  this.element.innerText = text
  return this
}

dom.prototype.html = function (html) {
  if (!html) {
    return this.element.innerHTML
  }
  this.element.innerHTML = html
  return this
}

dom.prototype.clone = function (element, deep) {
  return this.element.cloneNode(deep || false)
}

dom.parse = function (html) {
  var temp = document.createElement('TEMPLATE')
  temp.innerHTML = html
  return temp.content
}

dom.image = function (path, alt) {
  var image = new Image()
  image.src = path
  image.alt = alt || ''
  return image
}
