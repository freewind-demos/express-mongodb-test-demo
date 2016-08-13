var mongoose = require('mongoose');

module.exports = {
  connect: function () {
    mongoose.connect('mongodb://localhost/express-react-mongodb-demo');
  },
  close: function () {
    mongoose.connection.close();
  }
}