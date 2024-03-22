import { boardController } from '@/controllers/boardController'
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
  .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id').get(boardController.getDetail)
export const boardRoutes = Router
