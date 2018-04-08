module.exports = {
  development: {
    username: 'postgres',
    password: 'rocketmail',
    database: 'event_center_dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'rocketmail',
    database: 'event_center_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'rocketmail',
    database: 'event_center_prod',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
