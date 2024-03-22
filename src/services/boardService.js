import { boardModel } from '@/models/boardModel'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import slugify from 'slugify'

const createNew = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...data,
      slug: slugify(data.title, {
        lower: true,
        trim: true
      })
    }
    const createdBoard = await boardModel.createdNew(newBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetail = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetail(id)
    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach((col) => {
      // equals of mongodb
      col.cards = resBoard.cards.filter((card) => card.columnId.equals(col._id))
      // toString of JS
      // col.cards = resBoard.cards.filter((card) => card.columnId.toString() === col._id.toString())
    })
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetail
}
