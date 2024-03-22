import { columnController } from '@/controllers/columnController'
import { columnValidation } from '@/validations/columnValidation'
import express from 'express'

const Router = express.Router()

Router.route('/').post(columnValidation.createNew, columnController.createNew)

export const columnRoute = Router
