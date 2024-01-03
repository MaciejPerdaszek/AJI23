const mysql = require('mysql2');

let connection;
const dbConfig = require('./config.json');
if (!dbConfig) {
  throw new Error('Missing database config!');
}

function connect() {
    connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
    });

    connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        setTimeout(connect, 2000);
    } else {
        console.log('Connected to MySQL database!');
    }
    });

    connection.on('error', (error) => {
    console.error('MySQL database error:', error);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        connect();
    } else {
        throw error;
    }
    });
}

connect();

function executeQuery(query, values) {
    return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
        if (error) {
        reject(error);
        } else {
        resolve(results);
        }
    });
    });
}

export { executeQuery }