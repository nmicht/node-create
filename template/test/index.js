import ${name} from '../src/index'
import tap from 'tap'

tap.test('${name}', (t) => {
  t.test('first test', (assert) => {
    assert.ok(true)
    assert.end()
  })

  .then(t.end)
})
