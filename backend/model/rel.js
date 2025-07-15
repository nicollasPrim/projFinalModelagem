const Produto = require('./produto')
const Compra = require('./compra')
const Usuario = require('./usuario')

// Produto -> Compra (1:N)
Produto.hasMany(Compra, {
  foreignKey: 'id_produto',
  sourceKey: 'id', // corrigido: chave primária do Produto
  as: 'compras'
})
Compra.belongsTo(Produto, {
  foreignKey: 'id_produto',
  targetKey: 'id', // corrigido: chave primária do Produto
  as: 'produto'
})

// Usuario -> Compra (1:N)
Usuario.hasMany(Compra, {
  foreignKey: 'id_usuario',
  sourceKey: 'id',
  as: 'compras'
})
Compra.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  targetKey: 'id',
  as: 'usuario'
})

module.exports = { Compra, Usuario, Produto }
