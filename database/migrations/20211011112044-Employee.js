'use strict'

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    const { DataTypes } = Sequelize
    await QueryInterface.createTable('employees', {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      companyId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'company_id',
        primaryKey: false,
        references: {
          model: {
            tableName: 'companies'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      firstname: { type: DataTypes.STRING, allowNull: false },
      middlename: { type: DataTypes.STRING, allowNull: true },
      lastname: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
      deletedAt: { type: DataTypes.DATE, allowNull: true, field: 'deleted_at' },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
    })
  },

  down: async (QueryInterface) => {
    await QueryInterface.dropTable('employees')
  }
}
