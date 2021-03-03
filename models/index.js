
const { DataTypes } = require('sequelize');
const {db}=require("../db/sql");

const Certificates = db.define('certificate', {
  certificate_id: {
    type: DataTypes.INTEGER(255),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  //
  batch_code: {
    type: DataTypes.INTEGER(255),
    allowNull: true,
  },
  //
  stuff_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  //
  stuff_no:{
    type:DataTypes.INTEGER,
    allowNull:true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  //
  batch_trainer: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  //
  training_code: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  //
  batch_start_date: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  //
  training_title: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  //
  pdf_location: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  jpg_location: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  //
  string:{
    type: DataTypes.STRING(255),
   
    allowNull: false

  },
  //
  certificate_hash:{
    type:DataTypes.STRING(255),
    
    allowNull:true,
  },
  //
  transaction_hash:{
    type:DataTypes.STRING(255),
  
    allowNull:true,
  }
});

  db.sync()

module.exports = Certificates;
