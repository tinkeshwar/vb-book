import Employee from '../../../models/Employee'
import MasterController from '../master/MasterController'

class EmployeeController extends MasterController<typeof Employee> {
  constructor () {
    super(Employee)
  }
}

EmployeeController.options = {
  id: 'id',
  searchBy: ['id'],
  sortBy: ['created_at', 'desc'],
  createWith: ['firstname', 'middlename', 'lastname', 'email', 'phone'],
  updateWith: ['firstname', 'middlename', 'lastname', 'email', 'phone', 'status'],
  included: ['company']
}

export default EmployeeController
