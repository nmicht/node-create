import ${name} from '../src/index'
import { test } from 'tap'

test('${name}', tap => {
  tap.plan(1)

  tap.test('first test', assert => {
    assert.plan(1)

    assert.ok(true)
  })
})
