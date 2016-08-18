var mongoose = require('mongoose');

module.exports = {
  connect: function (mode, callback) {
    let url = 'mongodb://localhost/express-react-mongodb-demo';
    if (mode === 'test') {
      url = 'mongodb://localhost/express-react-mongodb-test-demo';
    }
    mongoose.connect(url, callback);
  },
  close: function (callback) {
    mongoose.connection.close(callback);
  }
};