const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produtos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    discountPercentage: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING(10000),
        allowNull: false
    }
}, {
    tableName: 'produtos',
    timestamps: false
})

module.exports = Produto