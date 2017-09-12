require("babel-register")()

const next = require('next')
const express = require('express')
const path = require('path')

const nettestHandler = require('./server/nettestHandler')

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = parseInt(process.env.PORT) || 3200

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.get('/nettest', nettestHandler)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT, err => {
    if (err) {
      throw err
    }
    console.log('> Ready on http://localhost:' +
                process.env.PORT +
                ' [' + process.env.NODE_ENV + ']')
  })
})
