const Produto = require('./produto')
const Compra = require('./compra')
const Usuario = require('./usuario')

Produto.hasMany(Compra, {
  foreignKey: 'id_produto',
  sourceKey: 'id_produto',
  as: 'compras'
})
Compra.belongsTo(Produto, {
  foreignKey: 'id_produto',
  targetKey: 'id_produto',
  as: 'produto'
})

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