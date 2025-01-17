import * as Path from 'node:path'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import cats from './routes/cats.ts'
import multipleCats from './routes/multipleCats.ts'

const server = express()

server.use(express.json())
server.use(cors('*' as CorsOptions))
server.use('/api/v1/cats', cats)
server.use('/api/v1/multipleCats', multipleCats)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
