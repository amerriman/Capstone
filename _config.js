var mongoURI = {
  development: 'mongodb://localhost/write',
  test: 'mongodb://localhost/write-test',
  production: process.env.MONGOLAB_URI
};


var config = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  MONGO_URI: mongoURI,
  SALT_WORK_FACTOR: 10,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  WATSON_KEY: process.env.WATSON_KEY
};

module.exports = config;
