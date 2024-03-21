/* eslint-disable no-console */
import { CONNECT_DB } from '@/config/mongodb'
import express from 'express'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 3000

  app.listen(port, hostname, () => {
    console.log(`App run at ${hostname}:${port} 🔥`)
  })
}

// IIFE
;(async () => {
  try {
    console.log('Connected to MongoDB Cloud Atlas 💥')
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
