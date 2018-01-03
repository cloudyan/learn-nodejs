import Database from './Database'

const client = new Database('./test.db')

client.on('load', () => {
  const foo = client.get('foo')
  console.log(foo)

  client.set('bar', 'my sweet value', (err) => {
    if (err) console.error(err)
    console.log('write successful')
  })

  client.del('baz')
})
