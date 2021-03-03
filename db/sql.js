const sequelize = require('sequelize');

const db = new sequelize(
    "block_chain",
    "admin",
    "admin1234",
  {
    dialect: 'mysql',
    host: "oyesters-db-1.clcmspyxrtn3.ap-south-1.rds.amazonaws.com",
    dialectOptions: {
      // useUTC: true, //for reading from database
      dateStrings: true,
      typeCast: true,
      timezone: '+05:30',
      multipleStatements: true,
    },
   
    timezone: '+05:30', //for writing to database
    operatorsAliases: false,
  }
);

db.authenticate()
  .then(() => {
    console.log('database connected successfully');
  })
  .catch((e) => {
    console.log('ERROR DATABASE NOT CONNECTED',e);
  });

module.exports = { db };
