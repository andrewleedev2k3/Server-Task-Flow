import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 3000

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`App run at ${hostname}:${port} 🔥`)
})
