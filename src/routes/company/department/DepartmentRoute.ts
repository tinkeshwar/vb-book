import Joi from 'joi'
import { DepartmentListResponseSchema, DepartmentResponseDropdownListSchema, DepartmentResponseSchema } from '../../../schemas/Department'
import DepartmentController from '../../../controllers/company/department/DepartmentController'
import { InternalServerErrorSchema, UnauthorizedErrorSchema, StatusChangeSchema, BadRequestErrorSchema } from '../../../schemas/Common'

const controller = new DepartmentController()

export default [
  {
    path: '/api/company/department/departments',
    method: 'GET',
    handler: controller.list.bind(controller),
    config: {
      description: 'Departments list',
      notes: 'Return a list of all departments',
      tags: ['api', 'Department'],
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
          200: DepartmentListResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/department/departments',
    method: 'POST',
    handler: controller.store.bind(controller),
    config: {
      description: 'Create Department',
      notes: 'Create new department in system',
      tags: ['api', 'Department'],
      auth: {
        strategy: 'token'
      },
      validate: {
        options: { abortEarly: false },
        payload: {
          name: Joi.string().required().example('Sample'),
          email: Joi.string().email().required().example('hr@glocalview.com')
        }
      },
      response: {
        status: {
          200: DepartmentResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/department/departments/{id}',
    method: 'GET',
    handler: controller.show.bind(controller),
    config: {
      description: 'Get A Department',
      notes: 'Get a department details',
      tags: ['api', 'Department'],
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
          200: DepartmentResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/department/departments/{id}',
    method: 'PUT',
    handler: controller.update.bind(controller),
    config: {
      description: 'Update A Department',
      notes: 'Update a department details',
      tags: ['api', 'Department'],
      auth: {
        strategy: 'token'
      },
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().example(1)
        },
        payload: {
          name: Joi.string().required().example('Sample'),
          email: Joi.string().email().required().example('hr@glocalview.com')
        }
      },
      response: {
        status: {
          200: DepartmentResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/department/departments/{id}',
    method: 'DELETE',
    handler: controller.destroy.bind(controller),
    config: {
      description: 'Delete A Department',
      notes: 'Delete a department from system',
      tags: ['api', 'Department'],
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
          200: DepartmentResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/department/departments/{id}',
    method: 'PATCH',
    handler: controller.status.bind(controller),
    config: {
      description: 'Activate Deactivate',
      notes: 'Enable-disable department',
      tags: ['api', 'Department'],
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
  },
  {
    path: '/api/company/department/departments/dropdown',
    method: 'GET',
    handler: controller.dropdown.bind(controller),
    config: {
      description: 'Departments dropdown list',
      notes: 'Return a list of all active departments',
      tags: ['api', 'Department'],
      auth: {
        strategy: 'token'
      },
      validate: {
        options: { abortEarly: false },
        query: {
          sort: Joi.string().optional().default('name'),
          order: Joi.string().optional().default('ASC')
        }
      },
      response: {
        status: {
          200: DepartmentResponseDropdownListSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  }
]
