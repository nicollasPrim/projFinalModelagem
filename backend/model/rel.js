const Produto = require('./produto')
const Compra = require('./compra')
const Usuario = require('./usuario')

Usuario.hasMany(Produto, {
    foreignKey: 'usuario_id',
    as: 'produtosUsuario',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuarioProdutos',
    allowNull: false
})

Compra.hasMany(Produto, {
    foreignKey: 'compra_id',
    as: 'produtoCompra',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Compra, {
    foreignKey: 'compra_id',
    as: 'compraProduto',
    allowNull: false
})

module.exports = { Compra, Usuario, Produto }