import { boardRoutes } from '@/routes/v1/boardRoute'
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs V1 are read to use.',
    code: StatusCodes.OK
  })
})

Router.use('/boards', boardRoutes)

export const APIs_V1 = Router
