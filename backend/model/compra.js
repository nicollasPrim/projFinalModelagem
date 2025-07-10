const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Compras = db.define('compras', {
    id_compra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dt_compra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    preco_unit: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    desc_aplicado: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    preco_final: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    forma_pagamento: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    status_compra: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Compras