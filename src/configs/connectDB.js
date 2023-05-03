// cách 1 :
/*
let mysql = require( 'mysql2');

// create the connection to database
// tạo kết nối tới cơ sở dữ liệu



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nodejs',
  password: 'To@i1988'
});



connection.connect( (err) =>{
  if(err){
    console.error('error connecting: ok' + err.stack );
    return;
  }
    console.log('connected as id ' );
  
});

// connection.query(`SELECT * FROM nodejs.expenses`, (err, res) =>{
//   return console.log(res);
// })




// execute will internally call prepare and query
// thực thi sẽ gọi nội bộ chuẩn bị và truy vấn



// let data =[];
// connection.query(
//   'SELECT * FROM `mydb`',
//   function(err, results, fields) {
//     if(err) throw err ;
//     console.log(results); // results contains rows returned by server
//     // console.log(fields); // fields contains extra meta data about results, if available
//     data= results.map((row) => {return row});
//   }
// );

export default connection;

*/


// -------------------------------------------------------------------------//

// cách 2 :

//let mysql = require( 'mysql2/promise' );

import mysql from 'mysql2/promise';    


console.log( `create connect to database.........`)


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejs',
  password: 'To@i1988'
});

export default pool;
