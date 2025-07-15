const conn = require('./db/conn')
const { Usuario, Produto, Compra } = require('./model/rel')

async function syncDataBase() {
  try {
    await conn.sync({ force: true }) // recria tabelas
    console.log('Tabelas criadas e banco sincronizado!')
  } catch (err) {
    console.error('Erro ao sincronizar banco!', err)
  } finally {
    await conn.close() // fecha conexão
    console.log('Banco fechado!')
  }
}

syncDataBase()
