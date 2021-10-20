import Joi from 'joi'
import { CompanyListResponseSchema, CompanyResponseSchema } from '../../../schemas/Company'
import CompanyController from '../../../controllers/admin/company/CompanyController'
import { InternalServerErrorSchema, UnauthorizedErrorSchema, StatusChangeSchema, BadRequestErrorSchema } from '../../../schemas/Common'

const controller = new CompanyController()

export default [
  {
    path: '/api/admin/company/companies',
    method: 'GET',
    handler: controller.list.bind(controller),
    config: {
      description: 'Companies list',
      notes: 'Return a list of all companies',
      tags: ['api', 'Company'],
      auth: {
        strategy: 'token',
        access: { scope: 'companies.list' }
      },
      validate: {
        options: { abortEarly: false },
        query: {
          page: Joi.number().min(1).default(1),
          records: Joi.number().min(1).default(10),
          sort: Joi.string().optional(),
          order: Joi.string().optional()
        }
      },
      response: {
        status: {
          200: CompanyListResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/admin/company/companies',
    method: 'POST',
    handler: controller.store.bind(controller),
    config: {
      description: 'Create Company',
      notes: 'Create new company in system',
      tags: ['api', 'Company'],
      auth: {
        strategy: 'token',
        access: { scope: 'companies.create' }
      },
      validate: {
        options: { abortEarly: false },
        payload: {
          name: Joi.string().required().example('Glocalview'),
          address: Joi.string().optional().allow(null),
          firstname: Joi.string().required().example('John'),
          middlename: Joi.string().optional().allow(null).empty(''),
          lastname: Joi.string().optional().allow(null).empty(''),
          email: Joi.string().email().required().example('john@doe.com'),
          phone: Joi.number().required().example('9876543210'),
          password: Joi.string().required()
        }
      },
      response: {
        status: {
          200: CompanyResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/admin/company/companies/{id}',
    method: 'GET',
    handler: controller.show.bind(controller),
    config: {
      description: 'Get A Company',
      notes: 'Get a company details',
      tags: ['api', 'Company'],
      auth: {
        strategy: 'token',
        access: { scope: 'companies.show' }
      },
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().example(1)
        }
      },
      response: {
        status: {
          200: CompanyResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/admin/company/companies/{id}',
    method: 'PUT',
    handler: controller.update.bind(controller),
    config: {
      description: 'Update A Company',
      notes: 'Update a company details',
      tags: ['api', 'Company'],
      auth: {
        strategy: 'token',
        access: { scope: 'companies.update' }
      },
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().example(1)
        },
        payload: {
          name: Joi.string().required().example('Glocalview'),
          address: Joi.string().optional().allow(null)
        }
      },
      response: {
        status: {
          200: CompanyResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/admin/company/companies/{id}',
    method: 'DELETE',
    handler: controller.destroy.bind(controller),
    config: {
      description: 'Delete A Company',
      notes: 'Delete a company from system',
      tags: ['api', 'Company'],
      auth: {
        strategy: 'token',
        access: { scope: 'companies.destroy' }
      },
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().example(1)
        }
      },
      response: {
        status: {
          200: CompanyResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/admin/company/companies/{id}',
    method: 'PATCH',
    handler: controller.status.bind(controller),
    config: {
      description: 'Activate Deactivate',
      notes: 'Enable-disable company',
      tags: ['api', 'Company'],
      auth: {
        strategy: 'token',
        access: { scope: 'companies.status' }
      },
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().example(1)
        }
      },
      response: {
        status: {
          200: StatusChangeSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  }
]
