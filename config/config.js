module.exports = {
  jwtSecret: 'AbCd1234', // TODO pass this in through the environment
  jwtSession: {
    session: false
  },
  database: {
    dev: 'mongodb://mongo:27017/login',
    test: 'mongodb://mongo:27017/login'
  }
};
