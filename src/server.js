/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB } from '@/config/mongodb'
import env from '@/config/environment'
import { APIs_V1 } from '@/routes/v1'
const START_SERVER = () => {
  const app = express()
  app.use(express.json())
  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hi ${env.AUTHOR}. App run at ${env.APP_HOST}:${env.APP_PORT} 🔥`)
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
