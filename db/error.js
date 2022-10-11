const { Pool } = require('pg')
const pool = new Pool()
pool.connect((err, client, done) => {
  const shouldAbort = err => {
    if (err) {
      console.error('Error in transaction', err.stack)
      client.query('ROLLBACK', err => {
        if (err) {
          console.error('Error rolling back client', err.stack)
        }
        // release the client back to the pool
        done()
      })
    }
    return !!err
  }
  client.query('BEGIN', err => {
    if (shouldAbort(err)) return
    const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
    client.query(queryText, ['brianc'], (err, res) => {
      if (shouldAbort(err)) return
      const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
      const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
      client.query(insertPhotoText, insertPhotoValues, (err, res) => {
        if (shouldAbort(err)) return
        client.query('COMMIT', err => {
          if (err) {
            console.error('Error committing transaction', err.stack)
          }
          done()
        })
      })
    })
  })
})