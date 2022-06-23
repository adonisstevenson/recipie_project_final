// const Pool = require('pg').Pool;

// const db = new Pool({
//     user:'postgres',
//     host: 'localhost',
//     database: 'recipies',
//     password: 'postgres',
//     port: '5432'

// });

// module.exports = db;


const sql = require('mssql/msnodesqlv8')

const db = new sql.ConnectionPool({
  database: 'recipies',
  server: 'DESKTOP-BK97AM5\SQLEXPRESS',
  driver: 'msnodesqlv8',
  port: '5432',
  options: {
    trustedConnection: true
  }
})

db.connect().then(() => {
    //simple query
    db.request().query('select 1 as number', (err, result) => {
          console.log(result)
      })
  })


module.exports = db;