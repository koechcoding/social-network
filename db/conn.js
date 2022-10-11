const { Pool, Client } = require('pg')
const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  connectionString,
})


pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})


const client = new Client({
  connectionString,
})


client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})