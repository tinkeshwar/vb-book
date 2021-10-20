import Joi from 'joi'

const date = new Date()

const DepartmentResponse = Joi.object({
  id: Joi.number().required().example(1),
  name: Joi.string().required().example('Sample'),
  email: Joi.string().email().required().example('hr@glocalview.com'),
  status: Joi.boolean().default(false),
  created_at: Joi.date().optional().allow(null).example(date),
  updated_at: Joi.date().optional().allow(null).example(date)
}).unknown().label('Department')

const DepartmentResponseList = Joi.object({
  list: Joi.array().items(DepartmentResponse).required().label('List Data'),
  meta: Joi.object({
    total: Joi.number().required().example(0),
    page: Joi.number().required().example(1),
    per_page: Joi.number().required().example(1)
  }).unknown().label('List Meta')
}).unknown().label('Department List')

const DepartmentResponseDropdownList = Joi.object({
  items: Joi.array().items(DepartmentResponse).optional().label('List Data')
}).unknown().label('Department Dropdown List')

export const DepartmentListResponseSchema = DepartmentResponseList
export const DepartmentResponseSchema = DepartmentResponse
export const DepartmentResponseDropdownListSchema = DepartmentResponseDropdownList
