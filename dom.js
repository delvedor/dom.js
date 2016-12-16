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

    if (this.element === null) {
      console.log('Dom.js: The element \'' + selector + '\' you selected does not exist!')
      this.element = document.createDocumentFragment()
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

  Dom.prototype.hasClass = function (className) {
    return this.classList().indexOf(className) > -1
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

  Dom.prototype.off = function (eventName, callback) {
    if (eventName && callback) {
      this.element.removeEventListener(eventName, callback)
    } else {
      var newEle = this.clone(true)
      this.parent().replace(newEle, this.element)
    }

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

  Dom.prototype.value = function (value) {
    if (typeof value !== 'string') {
      return this.element.value
    }
    this.element.value = value
    return this
  }

  Dom.prototype.attr = function (name, value) {
    if (!value) {
      return this.element.getAttribute(name)
    }
    this.element.setAttribute(name, value)
    return this
  }

  Dom.prototype.removeAttr = function (name) {
    this.element.removeAttribute(name)
    return this
  }

  Dom.prototype.hasAttr = function (name) {
    return this.element.hasAttribute(name)
  }

  Dom.prototype.test = function (regex) {
    return regex.test(this.element.value)
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
      if (xhr.readyState === XMLHttpRequest.DONE && (options.local ? xhr.status === 200 || xhr.status === 0 : xhr.status === 200)) {
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

  Dom.prototype.swipe = function (callback) {
    this.element.addEventListener('touchstart', handleTouchStart, false)
    this.element.addEventListener('touchmove', handleTouchMove, false)
    callback = callback.bind(this)

    var xDown = null
    var yDown = null

    function handleTouchStart (evt) {
      xDown = evt.touches[0].clientX
      yDown = evt.touches[0].clientY
    }

    function handleTouchMove (evt) {
      if (!xDown || !yDown) {
        return
      }
      var direction = null

      var xUp = evt.touches[0].clientX
      var yUp = evt.touches[0].clientY

      var xDiff = xDown - xUp
      var yDiff = yDown - yUp

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        direction = xDiff > 0 ? 'left' : 'right'
      } else {
        direction = yDiff > 0 ? 'up' : 'down'
      }

      xDown = null
      yDown = null
      callback(direction)
    }

    return this
  }

  global.dom = Dom
  global.$ = global.$ || Dom
})(window)
