import Joi from 'joi'
import { EmployeeListResponseSchema, EmployeeResponseSchema } from '../../../schemas/Employee'
import EmployeeController from '../../../controllers/company/employee/EmployeeController'
import { InternalServerErrorSchema, UnauthorizedErrorSchema, StatusChangeSchema, BadRequestErrorSchema } from '../../../schemas/Common'

const controller = new EmployeeController()

export default [
  {
    path: '/api/company/employee/employees',
    method: 'GET',
    handler: controller.list.bind(controller),
    config: {
      description: 'Employees list',
      notes: 'Return a list of all employees',
      tags: ['api', 'Employee'],
      auth: {
        strategy: 'token'
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
          200: EmployeeListResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/employee/employees',
    method: 'POST',
    handler: controller.store.bind(controller),
    config: {
      description: 'Create Employee',
      notes: 'Create new employee in system',
      tags: ['api', 'Employee'],
      auth: {
        strategy: 'token'
      },
      validate: {
        options: { abortEarly: false },
        payload: {
          firstname: Joi.string().required().example('John'),
          middlename: Joi.string().optional().empty(''),
          lastname: Joi.string().optional().empty(''),
          email: Joi.string().email().required().example('john@doe.com'),
          phone: Joi.number().required().example('9876543210'),
          department: Joi.number().optional().allow(null).empty('')
        }
      },
      response: {
        status: {
          200: EmployeeResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/employee/employees/{id}',
    method: 'GET',
    handler: controller.show.bind(controller),
    config: {
      description: 'Get A Employee',
      notes: 'Get a employee details',
      tags: ['api', 'Employee'],
      auth: {
        strategy: 'token'
      },
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().example(1)
        }
      },
      response: {
        status: {
          200: EmployeeResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/employee/employees/{id}',
    method: 'PUT',
    handler: controller.update.bind(controller),
    config: {
      description: 'Update A Employee',
      notes: 'Update a employee details',
      tags: ['api', 'Employee'],
      auth: {
        strategy: 'token'
      },
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().example(1)
        },
        payload: {
          firstname: Joi.string().required().example('John'),
          middlename: Joi.string().optional().empty(''),
          lastname: Joi.string().optional().empty(''),
          email: Joi.string().email().required().example('john@doe.com'),
          phone: Joi.number().required().example('9876543210')
        }
      },
      response: {
        status: {
          200: EmployeeResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/employee/employees/{id}',
    method: 'DELETE',
    handler: controller.destroy.bind(controller),
    config: {
      description: 'Delete A Employee',
      notes: 'Delete a employee from system',
      tags: ['api', 'Employee'],
      auth: {
        strategy: 'token'
      },
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().example(1)
        }
      },
      response: {
        status: {
          200: EmployeeResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/employee/employees/{id}',
    method: 'PATCH',
    handler: controller.status.bind(controller),
    config: {
      description: 'Activate Deactivate',
      notes: 'Enable-disable employee',
      tags: ['api', 'Employee'],
      auth: {
        strategy: 'token'
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
