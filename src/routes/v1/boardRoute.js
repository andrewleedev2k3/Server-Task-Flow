import { boardController } from '@/controllers/boardController'
import { boardValidation } from '@/validations/boardValidation'
import express from 'express'

const Router = express.Router()

Router.route('/').post(boardValidation.createNew, boardController.createNew)

Router.route('/:id')
  .get(boardController.getDetail)
  .put(boardValidation.update, boardController.update)

export const boardRoute = Router
