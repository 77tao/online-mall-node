var mongoose = require('mongoose');
var chalk = require('chalk');
var url = 'mongodb://localhost:27017/mall-test';

mongoose.connect(url, {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log(chalk.green(' success connection to ' + url));
});

module.exports = mongoose;