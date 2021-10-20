const entities = []
const now = new Date()

entities.push({ name: 'companies.list', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'companies.create', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'companies.show', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'companies.update', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'companies.destroy', status: 1, level: 'low', created_at: now, updated_at: now })
entities.push({ name: 'companies.status', status: 1, level: 'low', created_at: now, updated_at: now })

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
