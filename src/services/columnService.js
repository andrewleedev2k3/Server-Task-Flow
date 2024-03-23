import { boardModel } from '@/models/boardModel'
import { cardModel } from '@/models/cardModel'
import { columnModel } from '@/models/columnModel'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (data) => {
  try {
    const newColumn = {
      ...data
    }
    const createdColumn = await columnModel.createdNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    if (getNewColumn) {
      getNewColumn.cards = []
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn
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
    const updatedColumn = await columnModel.update(id, updateData)
    return updatedColumn
  } catch (error) {
    throw error
  }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)

    if (!targetColumn) throw new ApiError(StatusCodes.NOT_FOUND, 'Column Not Found!')
    // Delete Column
    await columnModel.deleteOneById(columnId)

    // Delete all card in column
    await cardModel.deleteManyByColumnId(columnId)

    // Delete columnId -> columnOrderIds in Board
    await boardModel.pullColumnOrderIds(targetColumn)
    return { deleteMessage: 'Column and its Cards deleted successfully!' }
  } catch (error) {
    throw error
  }
}
export const columnService = {
  createNew,
  update,
  deleteItem
}
