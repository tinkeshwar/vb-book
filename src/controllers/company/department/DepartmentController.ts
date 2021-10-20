import Department from '../../../models/Department'
import MasterController from '../master/MasterController'

class DepartmentController extends MasterController<typeof Department> {
  constructor () {
    super(Department)
  }
}

DepartmentController.options = {
  id: 'id',
  searchBy: ['id'],
  sortBy: ['created_at', 'desc'],
  createWith: ['name', 'email'],
  updateWith: ['name', 'email', 'status'],
  included: []
}

export default DepartmentController
