const config = require('config'); 
require("dotenv").config();
module.exports = function() {
  if (!process.env.MenuHub_Private_Key && config.get('API_Private_Key')) {

    throw new Error('FATAL ERROR: API_Private_Key.');
    process.exit(1); 
  }  
}