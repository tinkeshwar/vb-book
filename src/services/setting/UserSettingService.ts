import { User, UserSetting } from '../../models'
import { UserNotExistError } from '../error'

class UserSettingManager {
  static async getUserSettings (userId: number) {
    if (!userId) {
      throw new UserNotExistError()
    }
    const userSettings = await UserSetting.findAll({
      where: {
        user_id: userId,
        status: true
      }
    })
    return userSettings.map(setting => {
      return { key: setting.name, value: setting.value }
    })
  }

  static async getUserCompany (userId: number) {
    if (!userId) {
      throw new UserNotExistError()
    }
    const user = await User.findByPk(userId)
    if (!user) {
      throw new UserNotExistError()
    }
    const companies = await user.getCompanies()
    if (companies.length) {
      return companies[0]
    }
    return null
  }
}

export default UserSettingManager
