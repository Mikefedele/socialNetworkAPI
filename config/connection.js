const { connect, connection } = require('mongoose');


//todo seed it 1st time or drop it each time here w connectionStringURI
connect('mongodb://localhost:27017/socialNetworkAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
