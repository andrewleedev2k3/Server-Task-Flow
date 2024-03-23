import { boardController } from '@/controllers/boardController'
import { boardValidation } from '@/validations/boardValidation'
import express from 'express'

const Router = express.Router()

Router.route('/').post(boardValidation.createNew, boardController.createNew)

// Api support for move card different col
Router.route('/supports/moving-card').put(
  boardValidation.moveCardToDifferentColumn,
  boardController.moveCardToDifferentColumn
)

Router.route('/:id')
  .get(boardController.getDetail)
  .put(boardValidation.update, boardController.update)

export const boardRoute = Router
