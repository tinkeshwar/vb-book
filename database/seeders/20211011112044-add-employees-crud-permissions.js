const entities = []
const now = new Date()

entities.push({ name: 'employees.list', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'employees.create', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'employees.show', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'employees.update', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'employees.destroy', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'employees.status', status: 1, level: 'low', created_at: now, updated_at: now })

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('permissions', entities)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissions', {
      name: { [Sequelize.Op.in]: entities.map(entity => entity.name) }
    }, {})
  }
}
