const dotenv = require('dotenv'); 
require('dotenv').config();

const config = Object.freeze({
  PORT: process.env.PORT,
  PG_PASS: process.env.PG_PASS,
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRY: process.env.EXPIRY,
  DBNAME: process.env.DBNAME,
  PG_USER: process.env.PG_USER,
  COMMUNITY_LINK: process.env.COMMUNITY_LINK
});

// Export the models for use in other parts of the application  
module.exports = {  
  config  
};