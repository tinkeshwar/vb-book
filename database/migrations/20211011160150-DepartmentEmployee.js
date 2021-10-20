'use strict'

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    const { DataTypes } = Sequelize
    await QueryInterface.createTable('department_employee', {
      departmentId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'department_id',
        primaryKey: true,
        references: {
          model: {
            tableName: 'departments'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      employeeId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'employee_id',
        primaryKey: true,
        references: {
          model: {
            tableName: 'employees'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
    })
  },

  down: async (QueryInterface) => {
    await QueryInterface.dropTable('department_employee')
  }
}
