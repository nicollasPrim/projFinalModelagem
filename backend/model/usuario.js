const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName:'usuarios',
    timestamps: false
})

module.exports = Usuario