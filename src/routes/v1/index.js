import express from 'express'
import { boardRoute } from '@/routes/v1/boardRoute'
import { columnRoute } from '@/routes/v1/columnRoute'
import { cardRoute } from '@/routes/v1/cardRoute'

const Router = express.Router()

Router.use('/boards', boardRoute)

Router.use('/columns', columnRoute)

Router.use('/cards', cardRoute)

export const APIs_V1 = Router
