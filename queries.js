const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

pool.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected to db...')
    }
  })

const getUsers = (request, response) => {
    pool.query('SELECT * FROM tables.employee', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUsers
  }