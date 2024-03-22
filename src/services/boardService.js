import { boardModel } from '@/models/boardModel'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
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
    return board
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetail
}
