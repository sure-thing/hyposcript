/* eslint-disable react/jsx-key */
const { h } = require('../')

module.exports = (test, assert) => {
  test('h', async () => {
    const html = <div>foo</div>
    assert(html === `<div>foo</div>`)
  })

  test('h - nested', async () => {
    const html = (
      <div>
        <h1>test</h1>
      </div>
    )
    assert(html === `<div><h1>test</h1></div>`)
  })

  test('h - attrs', async () => {
    const html = <div class='test'>foo</div>
    assert(html === `<div class="test">foo</div>`)
  })

  test('h - aliases', async () => {
    const html = <div className='test'>foo</div>
    assert(html === `<div class="test">foo</div>`)
    const htmlFor = <label htmlFor='test'>foo</label>
    assert(htmlFor === `<label for="test">foo</label>`)
  })

  test('h - multi children', async () => {
    const html = (
      <div>
        <h1>foo</h1>
        <h1>bar</h1>
      </div>
    )
    assert(html === `<div><h1>foo</h1><h1>bar</h1></div>`)
  })

  test('h - component', async () => {
    function Comp ({ title, children }) {
      return (
        <div>
          <h1>{title}</h1>
          {children}
        </div>
      )
    }
    const html = (
      <div>
        <Comp title='test'>
          <span>foo</span>
        </Comp>
      </div>
    )
    assert(html === `<div><div><h1>test</h1><span>foo</span></div></div>`)
  })

  test('h - style', async () => {
    const obj = <div style={{ color: 'red', fontSize: '2rem' }}>foo</div>
    assert(obj === `<div style="color:red;font-size:2rem;">foo</div>`)
  })

  test('h - data attr', async () => {
    const html = <div data-component='foo'>foo</div>
    assert(html === `<div data-component="foo">foo</div>`)
  })

  test('h - boolean attr', async () => {
    const html = <button disabled>foo</button>
    assert(html === `<button disabled>foo</button>`)
  })

  test('h - non-boolean boolean attr + self-closing', async () => {
    const html = <input autocomplete='false' />
    assert(html === `<input autocomplete="false" />`)
  })

  test('h - children & children', async () => {
    const html = (
      <div children={[]}>
        <span />
      </div>
    )
    assert(html === `<div><span></span></div>`)
  })

  test('h - array', async () => {
    const html = <div>{true && [<span />, <span />]}</div>
    assert(html === `<div><span></span><span></span></div>`)
  })

  test('h - fragment', async () => {
    const html = (
      <div>
        {true && (
          <>
            <span />
            <span />
          </>
        )}
      </div>
    )
    assert(html === `<div><span></span><span></span></div>`)
  })

  test('handles falsy coercion', () => {
    const val = undefined
    const html = <div>{val && <h1>{val}</h1>}</div>
    assert(!/h1/.test(html))
  })

  test('can return null', () => {
    const Comp = () => null
    const html = (
      <div>
        <Comp />
      </div>
    )
    assert(html === '<div></div>')
  })

  /*
   * Hyperscript specific
   */

  test('h - no props', async () => {
    const html = h('div', null, 'foo')
    assert(html === `<div>foo</div>`)
  })

  test('h - array children', async () => {
    const html = h('div', null, [h('h1', {}, 'foo'), h('h1', {}, 'bar')])
    assert(html === `<div><h1>foo</h1><h1>bar</h1></div>`)
  })

  test('h - array children with falsy values', async () => {
    const value = undefined
    const html = h('div', null, [
      h('h1', {}, 'foo'),
      value && h('h2', {}, value),
      false && h('h3', {}, 'baz')
    ])
    assert(html === `<div><h1>foo</h1></div>`)
  })

  test('h - undefined children', async () => {
    const html = h('div', {}, [h('h1', {}, 'hello'), undefined])
    assert(html === `<div><h1>hello</h1></div>`)
  })

  test('h - children as props', async () => {
    const html = h('div', {
      children: [h('h1', {}, 'foo'), h('h1', {}, 'bar')]
    })
    assert(html === `<div><h1>foo</h1><h1>bar</h1></div>`)
  })
}
