var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

console.log("Environment is " + env);

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'signup'
    },
    port: 3000,
    db: 'mongodb://localhost/signup-development'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'signup'
    },
    port: 3000,
    db: 'mongodb://localhost/signup-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'signup'
    },
    port: 3000,
    db: 'mongodb://localhost/signup-production'
    
  }
};

module.exports = config[env];
