/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB } from '@/config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 3000

  app.listen(port, hostname, () => {
    console.log(`App run at ${hostname}:${port} 🔥`)
  })

  exitHook(() => {
    CLOSE_DB()
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
