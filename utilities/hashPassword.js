const bc = require('bcrypt');

async function hashPassword(password){
    return await bc.hash(password, await bc.genSalt(10));
}

module.exports = hashPassword;