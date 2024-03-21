import { boardValidation } from '@/validations/boardValidation'
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'API GET LIST BOARDS'
    })
  })
  .post(boardValidation.createNew)
export const boardRoutes = Router
