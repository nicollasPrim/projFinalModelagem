const conn = require('./db/conn')
const { Usuario, Produto, Compra } = require('./model/rel')

async function syncDataBase() {
    try {
        await conn.sync({force: true})
        console.log('Tabelas criadas e banco sincronizado!')
    } catch (err) {
        console.error('Não foi possivel criar as tabelas e sincronizar o banco!', err)
    } finally {
        await conn.close()
        console.log('Banco fechado!')
    }
}

syncDataBase()