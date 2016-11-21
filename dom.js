/* globals Image, HTMLElement, XMLHttpRequest, MutationObserver */

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

  Dom.prototype.parent = function () {
    return new Dom(this.element.parentNode)
  }

  Dom.prototype.remove = function () {
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

  Dom.prototype.css = function (rule) {
    rule = rule.replace(/-([a-z])/ig, function (all, letter) {
      return letter.toUpperCase()
    })
               .replace(/\n/g, '')
               .split(';')
               .filter(function (line) {
                 return line.trim() !== ''
               })
    for (var i = 0; i < rule.length; i++) {
      this.element.style[rule[i].split(':')[0].trim()] = rule[i].split(':')[1].trim()
    }

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

  Dom.prototype.observe = function (options, callback) {
    this.observer = new MutationObserver(callback.bind(this))
    this.observer.observe(this.element, options)
    return this
  }

  Dom.prototype.removeObserver = function () {
    if (this.observer) {
      this.observer.disconnect()
    }
    this.observer = null
    return this
  }

  Dom.get = function (selector) {
    if (typeof selector !== 'string') {
      throw new TypeError('Selector must be a string')
    }
    return document.querySelector(selector)
  }

  Dom.ajax = function (options) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (options.json) {
          try {
            return options.callback(null, JSON.parse(xhr.responseText))
          } catch (err) {
            return options.callback(err, null)
          }
        } else {
          return options.callback(null, xhr.responseText)
        }
      } else {
        options.callback({ err: 'Fetch failed', status: xhr.status, state: xhr.readyState }, null)
      }
    }
    xhr.open(options.method, options.url)
    xhr.send()
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
