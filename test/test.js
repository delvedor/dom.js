'use strict'

const test = require('tape')
const jsDom = require('jsdom')
const fs = require('fs')

jsDom.env({
  html: fs.readFileSync('./test/test.html', 'utf8'),
  scripts: [ './dom.js' ],
  done: runTest
})

function runTest (err, window) {
  if (err) throw err
  const document = window.document

  test('dom should exist in window object', t => {
    t.plan(1)
    t.ok(window.dom)
  })

  test('dom as "$" should exist in window object', t => {
    t.plan(1)
    t.ok(window.$)
  })

  test('should throw when selector is not a string/HTMLElement', t => {
    t.plan(2)
    try {
      window.dom(42)
      t.fail()
    } catch (e) {
      t.is(e.message, 'Selector must be a string or an HTMLElement')
      t.pass()
    }
  })

  test('dom should generate a new instance', t => {
    t.plan(1)
    const div = window.dom('#select-me')
    t.ok(div instanceof window.dom)
  })

  test('dom should get the given element', t => {
    t.plan(1)
    const div = window.dom('#select-me')
    t.equal(div.element, document.querySelector('#select-me'))
  })

  test('dom.get should get the given element', t => {
    t.plan(1)
    const div = window.dom.get('#select-me')
    t.equal(div, document.querySelector('#select-me'))
  })

  test('dom.replace should replace the given element', t => {
    t.plan(2)
    const div = window.dom('#replace')
    const oldEle = window.dom.get('#old')
    const newEle = window.dom.get('#new')
    t.equal(div.element.firstChild, document.querySelector('#replace').firstChild)
    div.replace(newEle, oldEle)
    t.equal(div.element.firstChild, document.querySelector('#replace').firstChild)
  })

  test('dom.append should append the given element', t => {
    t.plan(3)
    const div = window.dom('#append')
    t.equal(div.element.firstChild, null)
    div.append(window.dom.get('#new'))
    t.notEqual(div.element.firstChild, null)
    t.equal(div.element.firstChild, document.querySelector('#append').firstChild)
  })

  test('dom.parent should return the parent element (instanceof Dom)', t => {
    t.plan(3)
    const parent = window.dom('#the-son').parent()
    t.ok(parent instanceof window.dom)
    t.deepEqual(parent.element, document.querySelector('#the-parent'))
    t.notEqual(parent.element.innerHTML, document.querySelector('#the-son').innerHTML)
  })

  test('dom.remove should remove the given element', t => {
    t.plan(2)
    t.ok(document.querySelector('#remove-me'))
    window.dom('#remove-me').remove()
    t.notOk(document.querySelector('#remove-me'))
  })

  test('dom.css should update css of the given element', t => {
    t.plan(2)
    t.equal(document.querySelector('#style-me').style.color, 'red')
    window.dom('#style-me').css('color: white')
    t.equal(document.querySelector('#style-me').style.color, 'white')
  })

  test('dom.css multiline should update css of the given element', t => {
    t.plan(4)
    t.equal(document.querySelector('#style-me').style.color, 'white')
    window.dom('#style-me').css(`
      color: red;
      font-size: 1em;
      display: none;
    `)
    t.equal(document.querySelector('#style-me').style.color, 'red')
    t.equal(document.querySelector('#style-me').style.fontSize, '1em')
    t.equal(document.querySelector('#style-me').style.display, 'none')
  })

  test('dom.css multi-rule should update css of the given element', t => {
    t.plan(4)
    t.equal(document.querySelector('#style-me').style.color, 'red')
    window.dom('#style-me').css('color: white; font-size: 1.2em; display: block;')
    t.equal(document.querySelector('#style-me').style.color, 'white')
    t.equal(document.querySelector('#style-me').style.fontSize, '1.2em')
    t.equal(document.querySelector('#style-me').style.display, 'block')
  })

  test('dom.addClass should add a class to the given element', t => {
    t.plan(2)
    t.deepEqual(document.querySelector('#class-test').classList, {})
    window.dom('#class-test').addClass('a-class')
    t.equal(document.querySelector('#class-test').classList['0'], 'a-class')
  })

  test('dom.removeClass should remove a class to the given element', t => {
    t.plan(2)
    t.deepEqual(document.querySelector('#class-test').classList, { '0': 'a-class' })
    window.dom('#class-test').removeClass('a-class')
    t.deepEqual(document.querySelector('#class-test').classList, {})
  })

  test('dom.toggleClass should toggle a class to the given element', t => {
    t.plan(3)
    t.deepEqual(document.querySelector('#class-test').classList, {})
    window.dom('#class-test').toggleClass('a-class')
    t.deepEqual(document.querySelector('#class-test').classList, { '0': 'a-class' })
    window.dom('#class-test').toggleClass('a-class')
    t.deepEqual(document.querySelector('#class-test').classList, {})
  })

  test('dom.classList should return an array of class', t => {
    t.plan(2)
    var classList = window.dom('#class-test div').classList()
    t.ok(Array.isArray(classList))
    t.deepEqual(['class1', 'class2', 'class3'], classList)
  })

  test('dom.hasClass should find an element has the given class', t => {
    t.plan(2)
    t.true(window.dom('#has-class').hasClass('yes-it-has'))
    t.false(window.dom('#has-class').hasClass('nope'))
  })

  test('dom.removeChildren should remove all children', t => {
    t.plan(2)
    t.ok(document.querySelector('#father-with-children').innerHTML)
    window.dom('#father-with-children').removeChildren()
    t.notOk(document.querySelector('#father-with-children').innerHTML)
  })

  test('dom.text should get the text content of an element', t => {
    t.plan(1)
    t.equal(window.dom('#text-content').text(), document.querySelector('#text-content').textContent)
  })

  test('dom.text should set the text content of an element', t => {
    t.plan(1)
    var text = 'Winter is coming'
    window.dom('#text-content').text(text)
    t.equal(document.querySelector('#text-content').textContent, text)
  })

  test('dom.html should get the html content of an element', t => {
    t.plan(1)
    t.equal(window.dom('#text-content').html(), document.querySelector('#text-content').innerHTML)
  })

  test('dom.html should set the html content of an element', t => {
    t.plan(1)
    var html = '<span class="snow">Winter has come</span>'
    window.dom('#text-content').html(html)
    t.equal(document.querySelector('#text-content').innerHTML, html)
  })

  test('dom.clone should clone an element', t => {
    t.plan(1)
    var clone = window.dom('#clone-me').clone()
    t.deepEqual(clone, document.querySelector('#clone-me').cloneNode())
  })

  test('dom.clone deep should clone an element', t => {
    t.plan(1)
    var clone = window.dom('#clone-me').clone(true)
    t.deepEqual(clone, document.querySelector('#clone-me').cloneNode(true))
  })

  test('dom.value should get the value of the given element', t => {
    t.plan(1)
    t.equal(window.dom('#value').value(), 'some value')
  })

  test('dom.value should set the value of a given element', t => {
    t.plan(1)
    t.equal(window.dom('#value').value('stark').value(), 'stark')
  })

  test('dom.test should test with a regex the value of a given element', t => {
    t.plan(1)
    t.true(window.dom('#value').test(/stark/))
  })

  test('dom.attr should get the attribute of the given element', t => {
    t.plan(1)
    t.equal(window.dom('#attr').attr('type'), 'text')
  })

  test('dom.attr should set the attribute of a given element', t => {
    t.plan(1)
    t.equal(window.dom('#attr').attr('type', 'password').attr('type'), 'password')
  })

  test('dom.hasAttr should get the attribute of the given element', t => {
    t.plan(1)
    t.true(window.dom('#attr').hasAttr('type'))
  })

  test('dom.removeAttr should remove the attribute of the given element', t => {
    t.plan(1)
    window.dom('#attr').removeAttr('type')
    t.false(window.dom('#attr').hasAttr('type'))
  })

  test('If the element does not exist, element will be a document fragment', t => {
    t.plan(2)
    var ele = window.dom('not-existing')
    t.is(typeof ele.element, 'object') // eslint-disable-line
    t.notEqual(ele.element, null)
  })

  test('Should not throw on element not defined', t => {
    t.plan(1)
    var ele = window.dom('not-existing')
    try {
      ele.on('click', console.log)
      t.pass('Must not throw')
    } catch (e) {
      t.fail('Must not throw')
    }
  })

  test('dom.all shuold return an array of HTML elements', t => {
    t.plan(2)
    var elements = window.dom.all('.all')
    t.ok(Array.isArray(elements))
    t.is(elements.length, 5)
  })
}
