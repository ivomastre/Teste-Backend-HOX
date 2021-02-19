module.exports = {
  host: 'localhost',
  username: 'root',
  password: '123456',
  database: 'testdb',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true
  }
}
