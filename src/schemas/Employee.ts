import Joi from 'joi'

const date = new Date()

const EmployeeResponse = Joi.object({
  id: Joi.number().required().example(1),
  firstname: Joi.string().required().example('John'),
  middlename: Joi.string().optional().allow(null).example('Unknown'),
  lastname: Joi.string().optional().allow(null).example('Doe'),
  email: Joi.string().email().required().example('john@doe.com'),
  phone: Joi.string().required().example('9876543210'),
  status: Joi.boolean().default(false),
  created_at: Joi.date().optional().allow(null).example(date),
  updated_at: Joi.date().optional().allow(null).example(date)
}).unknown().label('Employee')

const EmployeeResponseList = Joi.object({
  list: Joi.array().items(EmployeeResponse).required().label('List Data'),
  meta: Joi.object({
    total: Joi.number().required().example(0),
    page: Joi.number().required().example(1),
    per_page: Joi.number().required().example(1)
  }).unknown().label('List Meta')
}).unknown().label('Employee List')

export const EmployeeListResponseSchema = EmployeeResponseList
export const EmployeeResponseSchema = EmployeeResponse
