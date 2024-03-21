import { boardModel } from '@/models/boardModel'
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

export const boardService = {
  createNew
}
