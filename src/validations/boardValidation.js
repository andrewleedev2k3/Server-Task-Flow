import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'
import { BOARD_TYPE } from '@/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required!!',
      'string.empty': "Title can't be empty!!",
      'string.min': 'Title lenght must be at 3 characters long!!',
      'string.max': 'Title lenght must be less than or equal 50 characters long!!',
      'string.trim': 'Title must not have leading or trailing whitespace!!'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Description is required!!',
      'string.empty': "Description can't be empty!!",
      'string.min': 'Description lenght must be at 3 characters long!!',
      'string.max': 'Description lenght must be less than or equal 256 characters long!!',
      'string.trim': 'Description must not have leading or trailing whitespace!!'
    }),
    type: Joi.string()
      .valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE)
      .required()
      .default(BOARD_TYPE.PUBLIC)
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).default(BOARD_TYPE.PUBLIC),
    columnOrderIds: Joi.array()
      .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
      .default([])
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew,
  update
}
