import Joi from 'joi'
import { AuthUserResponseSchema, PasswordRecoveryResponseSchema, PasswordResetResponseSchema } from '../../../schemas/User'
import { UnauthorizedErrorSchema, InternalServerErrorSchema, BadRequestErrorSchema } from '../../../schemas/Common'
import LoginController from '../../../controllers/company/auth/LoginController'

const controller = new LoginController()

export default [
  {
    path: '/api/company/auth/user/login',
    method: 'POST',
    handler: controller.login.bind(controller),
    options: {
      description: 'Login Company User',
      notes: 'Login company user into system',
      tags: ['api', 'Auth'],
      validate: {
        options: { abortEarly: false },
        payload: {
          email: Joi.string().email().required().example('tinkeshwar@company.com'),
          password: Joi.string().required().example('company')
        }
      },
      response: {
        status: {
          200: AuthUserResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/auth/user/forget-password',
    method: 'POST',
    handler: controller.forgot.bind(controller),
    options: {
      description: 'Forget password',
      notes: 'Reset password by requesting reset link',
      tags: ['api', 'Auth'],
      validate: {
        options: { abortEarly: false },
        payload: {
          email: Joi.string().email().required().example('tinkeshwar@company.com')
        }
      },
      response: {
        status: {
          200: PasswordRecoveryResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/auth/user/reset-password',
    method: 'POST',
    handler: controller.reset.bind(controller),
    options: {
      description: 'Reset password',
      notes: 'Change password by clicking reset link',
      tags: ['api', 'Auth'],
      validate: {
        options: { abortEarly: false },
        payload: {
          recovery_token: Joi.string().uuid().required().example('b3e0a663-ddeb-4aaa-8634-24d1ac42d0a3'),
          verfication_code: Joi.string().required().example('FSAYXY'),
          password: Joi.string().required().example('sample')
        }
      },
      response: {
        status: {
          200: PasswordResetResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/company/auth/user/refresh',
    method: 'POST',
    handler: controller.refresh.bind(controller),
    options: {
      description: 'Refresh session',
      notes: 'Return auth user new token',
      tags: ['api', 'Auth'],
      validate: {
        options: { abortEarly: false },
        payload: {
          refresh: Joi.string().required()
        }
      },
      response: {
        status: {
          200: AuthUserResponseSchema,
          400: BadRequestErrorSchema,
          401: UnauthorizedErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  }
]
