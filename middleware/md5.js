var crypto = require('crypto');

module.exports = {

  createHash(message){
    var hash = crypto.createHash('md5').update(message).digest('hex');
    return hash;
  }

}