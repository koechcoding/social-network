const { Pool } = require('pg')
const { RDS } = require('aws-sdk')

const signerOptions ={
    credentials:{
        accessKeyId: 'YOUR_ACCESS_KEY',
        secretAccessKey: 'YOUR-SECRET-ACCESS-KEY',
    },
    region: 'us-east-1',
    hostname: 'example.aslfdewrlk.us-east-1.rds.amazonaws.com',
    port: 5432,
    username: 'api-user',
}
const signer = new RDS.Signer()

const getPassword =()=> signer.getAuthToken(signerOptions)

const pool = new Pool({
    host: signerOptions.hostname,
    port: signerOptions.port,
    user: signerOptions.username,
    database: 'my-db',
    password: getPassword,
})
