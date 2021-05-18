// connect to database


const Pool = require("pg").Pool;
// // const url = require('url');

// // const DATABASE_URL = process.env.DATABASE_URL
// // console.log(DATABASE_URL);

// const db_url = url.parse(DATABASE_URL)
const pool = new Pool({
    // SECRET KEY NOT SHOWN
    
});






// const pool = new Pool({
//     user: "bzrkhymuypqxmt",
//     password: "59f0a746742f6b1a50f974038c8c3a63bcca3d831d3e3d489e5b3fb0f4d9a62c",
//     database: "d6b7mmv55c4h7a",
//     host: "ec2-34-206-8-52.compute-1.amazonaws.com",
//     port: 5432
// });

module.exports = { pool };
