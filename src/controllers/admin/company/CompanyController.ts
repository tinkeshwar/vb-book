import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Company from '../../../models/Company'
import MasterController from '../master/MasterController'
import connector from '../../../config/database'
import { User } from '../../../models'

class CompanyController extends MasterController<typeof Company> {
  constructor () {
    super(Company)
  }

  async store (request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Error | Hapi.ResponseObject> {
    try {
      const payload = await this.preStore(request)
      const exist = await this.isUnique(request)
      if (exist) {
        return Boom.conflict('Company with this name already exist.')
      }
      const emailExist = await User.findOne({ where: { email: payload.email } })
      if (emailExist) {
        return Boom.conflict('User with this email already exist.')
      }
      const phoneExist = await User.findOne({ where: { phone: payload.phone } })
      if (phoneExist) {
        return Boom.conflict('User with this phone number already exist.')
      }
      const company = await connector.transaction(async (t) => {
        payload.access = 2
        const user: User = await User.create(payload, { transaction: t })
        if (user) {
          payload.userId = user.id
        }
        const company = await Company.create(payload, { transaction: t })
        await user.addCompany(company, { transaction: t })
        return company
      })
      return response.response((await company.reload()).toJSON())
    } catch (error: any) {
      return Boom.badData(error)
    }
  }
}

CompanyController.options = {
  id: 'id',
  searchBy: ['id'],
  uniqueBy: ['name'],
  sortBy: ['created_at', 'desc'],
  createWith: ['id', 'name', 'address', 'firstname', 'lastname', 'middlename', 'phone', 'email', 'password'],
  updateWith: ['status', 'name', 'address'],
  included: []
}

export default CompanyController
