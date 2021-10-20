import bcrypt from 'bcrypt'
import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  Model
} from 'sequelize'
import Role from './Role'
import sequelize from '../config/database'
import { AutoDate, Column, Entity, Nullable, PrimaryKey, Unique } from '../utilities/SequelizeDecorator'
import Permission from './Permission'
import { uniq } from 'lodash'
import Image from './Image'
import UserSetting from './UserSetting'
import PasswordRecovery from './PasswordRecovery'
import Company from './Company'

@Entity('users', { sequelize, paranoid: true })
class User extends Model {
  public get scopes (): string[] {
    let permissionScopes: string[] = []
    let roleScopes: string[][] = []

    if (this.permissions) {
      permissionScopes = (this.permissions).map((permission:any) => (permission.name !== undefined) ? permission.name : '')
    }
    if (this.roles) {
      roleScopes = (this.roles).map((role) => role.scopes)
    }

    return uniq(permissionScopes.concat(...roleScopes))
  }

  public static associations: {
      permissions: Association<User, Permission>;
      roles: Association<User, Role>;
  };

  @PrimaryKey()
  public id!: number;

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
  @Column(DataTypes.STRING)
  public password?: string;

  @Nullable
  @Column(DataTypes.DATE)
  public emailVerifiedAt?: Date;

  @Nullable
  @Column(DataTypes.DATE)
  public phoneVerifiedAt?: Date;

  @Nullable
  @Column(DataTypes.BOOLEAN)
  public status?: boolean;

  @Nullable
  @Column(DataTypes.INTEGER)
  public access?: number;

  @AutoDate()
  public readonly createdAt!: Date;

  @AutoDate()
  public readonly updatedAt!: Date;

  @Nullable
  @Column(DataTypes.DATE)
  public readonly deletedAt?: Date;

  public readonly permissions?: Permission[];
  public readonly roles?: Role[];

  public getPermissions!: BelongsToManyGetAssociationsMixin<Permission>;
  public setPermission!: BelongsToManyAddAssociationMixin<Permission, number>;
  public addPermission!: BelongsToManyAddAssociationMixin<Permission, number>;
  public hasPermission!: BelongsToManyHasAssociationMixin<Permission, number>;
  public countPermissions!: BelongsToManyCountAssociationsMixin;
  public createPermission!: BelongsToManyCreateAssociationMixin<Permission>;
  public removePermission!: BelongsToManyRemoveAssociationMixin<Permission, number>;
  public removePermissions!: BelongsToManyRemoveAssociationsMixin<Permission, number>;

  public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
  public setRoles!: BelongsToManySetAssociationsMixin<Role, number>;
  public addRole!: BelongsToManyAddAssociationMixin<Role, number>;
  public hasRole!: BelongsToManyHasAssociationMixin<Role, number>;
  public countRoles!: BelongsToManyCountAssociationsMixin;
  public createRole!: BelongsToManyCreateAssociationMixin<Role>;
  public removeRole!: BelongsToManyRemoveAssociationMixin<Role, number>;
  public removeRoles!: BelongsToManyRemoveAssociationsMixin<Role, number>;

  public createImage!: HasOneCreateAssociationMixin<Image>;
  public getImage!: HasOneGetAssociationMixin<Image>;

  public addSetting!: HasOneCreateAssociationMixin<UserSetting>;

  public getCompanies!: BelongsToManyGetAssociationsMixin<Company>;
  public addCompany!: BelongsToManyAddAssociationMixin<Company, number>;

  public async authenticate (password: string) {
    const userPassword = this.get('password')
    if (!userPassword) {
      return false
    }

    const validPassword = await bcrypt.compare(password, userPassword as string)
    if (!validPassword) {
      return false
    }

    return true
  }

  public toJSON (): Record<string, any> {
    const user = this.get('', { plain: true }) as Record<string, any>
    delete user.password
    if (!user.deletedAt) {
      delete user.deletedAt
    }
    return user
  }
}

const hashPassword = async (user: User) => {
  if (!user.changed('password')) {
    return
  }
  const hash = await bcrypt.hash(user.get('password'), 10)
  user.set('password', hash)
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)

User.belongsToMany(Role, {
  as: 'roles',
  through: 'role_user',
  foreignKey: 'user_id',
  otherKey: 'role_id'
})

User.belongsToMany(Permission, {
  as: 'permissions',
  through: 'permission_user',
  foreignKey: 'user_id',
  otherKey: 'permission_id'
})

User.hasOne(Image, {
  as: 'image',
  foreignKey: 'imageable_id',
  constraints: false,
  scope: {
    imageableType: 'user'
  }
})

User.hasMany(UserSetting)

User.hasOne(PasswordRecovery)
PasswordRecovery.belongsTo(User)

export default User
