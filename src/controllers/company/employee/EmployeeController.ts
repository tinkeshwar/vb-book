import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Employee from '../../../models/Employee'
import MasterController from '../master/MasterController'

class EmployeeController extends MasterController<typeof Employee> {
  constructor () {
    super(Employee)
  }

  async store (request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Error | Hapi.ResponseObject> {
    try {
      const payload = await this.preStore(request)
      const exist = await this.isUnique(request)
      if (exist) {
        return Boom.conflict('Email or mobile exists.')
      }
      const employee = await Employee.create(payload)
      if (payload.department) {
        employee.addDepartment(payload.department)
      }
      return response.response((await employee.reload()).toJSON())
    } catch (error: any) {
      return Boom.badData(error)
    }
  }
}

EmployeeController.options = {
  id: 'id',
  searchBy: ['id'],
  uniqueBy: ['email', 'phone'],
  sortBy: ['created_at', 'desc'],
  createWith: ['firstname', 'middlename', 'lastname', 'email', 'phone', 'department'],
  updateWith: ['firstname', 'middlename', 'lastname', 'email', 'phone', 'department', 'status'],
  included: []
}

export default EmployeeController
