var mongoURI = {
  development: 'mongodb://localhost/write-smart',
  test: 'mongodb://localhost/write-smart-test',
  production: process.env.MONGOLAB_URI
};

module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  MONGO_URI: mongoURI,
  SALT_WORK_FACTOR: 10,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
};

