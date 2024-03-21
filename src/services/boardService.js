import ApiError from '@/utils/ApiError'
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
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
