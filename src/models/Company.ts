import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { AutoDate, Column, Entity, Nullable, PrimaryKey } from '../utilities/SequelizeDecorator'
import Department from './Department'
import Employee from './Employee'
import User from './User'

@Entity('companies', { sequelize })
class Company extends Model {
  @PrimaryKey()
  public id!: number;

  @Column(DataTypes.STRING)
  public name!: string;

  @Nullable
  @Column(DataTypes.TEXT)
  public address?: string;

  @Nullable
  @Column(DataTypes.BOOLEAN)
  public status?: boolean;

  @AutoDate()
  public readonly createdAt!: Date;

  @AutoDate()
  public readonly updatedAt!: Date;

  @Nullable
  @Column(DataTypes.DATE)
  public readonly deletedAt?: Date;

  public toJSON (): Record<string, any> {
    const company = this.get('', { plain: true }) as Record<string, any>
    if (!company.deletedAt) {
      delete company.deletedAt
    }
    return company
  }
}

Company.belongsToMany(User, {
  as: 'users',
  through: 'company_user',
  foreignKey: 'company_id',
  otherKey: 'user_id'
})

User.belongsToMany(Company, {
  as: 'companies',
  through: 'company_user',
  foreignKey: 'user_id',
  otherKey: 'company_id'
})

Company.hasMany(Department, { as: 'departments' })
Company.hasMany(Employee, { as: 'employees' })

export default Company
