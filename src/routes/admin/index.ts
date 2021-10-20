import { flatten } from 'lodash'
import Health from './master/HealthRoute'
import Auth from './auth/AuthRoute'
import User from './user/UserRoute'
import Permission from './user/PermissionRoute'
import Role from './user/RoleRoute'
import Upload from './master/UploadRoute'
import AuthUser from './auth/AuthUserRoute'
import Company from './company/CompanyRoute'
import Employee from './company/EmployeeRoute'
import Department from './company/DepartmentRoute'

export default flatten([
  Department as any,
  Employee as any,
  Company as any,
  AuthUser as any,
  Upload as any,
  Role as any,
  Permission as any,
  Health as any,
  Auth as any,
  User as any
])
