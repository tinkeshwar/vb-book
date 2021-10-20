import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { AutoDate, Column, Entity, ForeignKey, Nullable, PrimaryKey, Unique } from '../utilities/SequelizeDecorator'
import Employee from './Employee'

@Entity('departments', { sequelize })
class Department extends Model {
  @PrimaryKey()
  public id!: number;

  @ForeignKey()
  public companyId!: number;

  @Column(DataTypes.STRING)
  public name!: string;

  @Unique
  @Column(DataTypes.STRING)
  public email?: string;

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
    const department = this.get('', { plain: true }) as Record<string, any>
    if (!department.deletedAt) {
      delete department.deletedAt
    }
    return department
  }
}

Department.belongsToMany(Employee, {
  as: 'employees',
  through: 'department_employee',
  foreignKey: 'department_id',
  otherKey: 'employee_id'
})

Employee.belongsToMany(Department, {
  as: 'departments',
  through: 'department_employee',
  foreignKey: 'employee_id',
  otherKey: 'department_id'
})

export default Department
