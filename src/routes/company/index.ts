import { flatten } from 'lodash'
import Employee from './employee/EmployeeRoute'
import Department from './department/DepartmentRoute'
import AuthUser from './auth/AuthUserRoute'
import Auth from './auth/AuthRoute'

export default flatten([
  Employee as any,
  Department as any,
  AuthUser as any,
  Auth as any
])
