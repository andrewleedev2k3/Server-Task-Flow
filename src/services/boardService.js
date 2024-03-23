import { boardModel } from '@/models/boardModel'
import { cardModel } from '@/models/cardModel'
import { columnModel } from '@/models/columnModel'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import slugify from 'slugify'

const createNew = async (data) => {
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

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(id, updateData)
    return updatedBoard
  } catch (error) {
    throw error
  }
}

const moveCardToDifferentColumn = async (data) => {
  try {
    await columnModel.update(data.prevColumnId, {
      cardOrderIds: data.prevCardOrderIds,
      updateAt: Date.now()
    })
    await columnModel.update(data.nextColumnId, {
      cardOrderIds: data.nextCardOrderIds,
      updateAt: Date.now()
    })
    await cardModel.update(data.curCardId, {
      columnId: data.nextColumnId,
      updateAt: Date.now()
    })
    return {
      updateResult: 'Successfully'
    }
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetail,
  update,
  moveCardToDifferentColumn
}
