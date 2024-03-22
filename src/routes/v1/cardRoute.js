import { cardController } from '@/controllers/cardController'
import { cardValidation } from '@/validations/cardValidation'
import express from 'express'

const Router = express.Router()

Router.route('/').post(cardValidation.createNew, cardController.createNew)

export const cardRoute = Router
