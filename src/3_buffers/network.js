import zlib from 'zlib'

const database = [[], [], [], [], [], [], [], []]
const bitmasks = [1, 2, 4, 8, 16, 32, 64, 128]

function store (buf) {
  const db = buf[0]
  const key = buf.readUInt8(1)

  if (buf[2] === 0x78) {
    zlib.inflate(buf.slice(2), (er, inflatedBuf) => {
      if (er) return console.error(er)
      const data = inflatedBuf.toString()

      bitmasks.forEach((bitmask, index) => {
        if ((db & bitmask) === bitmask) {
          database[index][key] = data
        }
      })

      console.log('updated db', database)
    })
  }
}

zlib.deflate('my message', (er, deflateBuf) => {
  // const header = new Buffer(2)
  const header = Buffer.alloc(2)

  header[0] = 0x8 // which databases to store
  header[1] = 0 // key

  const message = Buffer.concat([header, deflateBuf])
  store(message)
})