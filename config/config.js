var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'signup'
    },
    port: 3000,
    db: 'mongodb://localhost/1self'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'signup'
    },
    port: 3000,
    db: 'mongodb://localhost/1self'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'signup'
    },
    port: 3000,
    db: 'mongodb://localhost/1self'
    
  }
};

module.exports = config[env];
