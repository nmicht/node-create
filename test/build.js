'use strict'

const tap = require('tap')

tap.test('build', assert => {
  assert.plan(1)

  try {
    var module = require('../build/')
    assert.type(module, 'function', 'should export a function')
  } catch (e) {
    assert.error(e)
  }
})
