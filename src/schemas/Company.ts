import Joi from 'joi'

const date = new Date()

const CompanyResponse = Joi.object({
  id: Joi.number().required().example(1),
  name: Joi.string().required().example('Glocalview'),
  address: Joi.string().optional().allow(null),
  status: Joi.boolean().default(false),
  created_at: Joi.date().optional().allow(null).example(date),
  updated_at: Joi.date().optional().allow(null).example(date)
}).unknown().label('Company')

const CompanyResponseList = Joi.object({
  list: Joi.array().items(CompanyResponse).required().label('List Data'),
  meta: Joi.object({
    total: Joi.number().required().example(0),
    page: Joi.number().required().example(1),
    per_page: Joi.number().required().example(1)
  }).unknown().label('List Meta')
}).unknown().label('Company List')

export const CompanyListResponseSchema = CompanyResponseList
export const CompanyResponseSchema = CompanyResponse
