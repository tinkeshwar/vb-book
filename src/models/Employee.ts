import { BelongsToManyAddAssociationMixin, BelongsToManyHasAssociationMixin, DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { AutoDate, Column, Entity, ForeignKey, Nullable, PrimaryKey, Unique } from '../utilities/SequelizeDecorator'
import Department from './Department'

@Entity('employees', { sequelize })
class Employee extends Model {
  @PrimaryKey()
  public id!: number;

  @ForeignKey()
  public companyId!: number;

  @Column(DataTypes.STRING)
  public firstname?: string;

  @Nullable
  @Column(DataTypes.STRING)
  public middlename?: string;

  @Nullable
  @Column(DataTypes.STRING)
  public lastname?: string;

  @Unique
  @Column(DataTypes.STRING)
  public phone?: string;

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

  public addDepartment!: BelongsToManyAddAssociationMixin<Department, number>;
  public hasDepartment!: BelongsToManyHasAssociationMixin<Department, number>;

  public toJSON (): Record<string, any> {
    const employee = this.get('', { plain: true }) as Record<string, any>
    if (!employee.deletedAt) {
      delete employee.deletedAt
    }
    return employee
  }
}

export default Employee
