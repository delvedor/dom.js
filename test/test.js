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
}
