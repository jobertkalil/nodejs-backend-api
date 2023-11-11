const { Sequelize }  = require('sequelize');

const sequelize = new Sequelize(
  "adaca_node",
  "root",
  "", 
  {
    dialect: "mysql",
    host: "localhost"
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sequelize,
  connectToDatabase
}