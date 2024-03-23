import { columnController } from '@/controllers/columnController'
import { columnValidation } from '@/validations/columnValidation'
import express from 'express'

const Router = express.Router()

Router.route('/').post(columnValidation.createNew, columnController.createNew)
Router.route('/:id').put(columnValidation.update, columnController.update)
export const columnRoute = Router
