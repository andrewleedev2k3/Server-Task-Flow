import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'API GET LIST BOARDS'
    })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({
      message: 'API GET CREATE NEW BOARDS'
    })
  })
export const boardRoutes = Router
