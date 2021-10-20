const entities = []
const now = new Date()

entities.push({ name: 'departments.list', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'departments.create', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'departments.show', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'departments.update', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'departments.destroy', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'departments.status', status: 1, level: 'low', created_at: now, updated_at: now })

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
