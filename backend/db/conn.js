const { Sequelize } = require('sequelize')
require('dotenv').config({ path: __dirname + '/.env', override: true })

console.log('DEBUG DB_USER:', process.env.DB_USER) 

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
})

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco rodando!'))
  .catch((err) => console.error('Conexão com o banco falhou!', err))

module.exports = sequelize