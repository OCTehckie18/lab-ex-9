const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const createDatabase = () => {
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
    const useDbQuery = `USE ${process.env.DB_NAME}`;

    // Use query() instead of execute() for database creation
    connection.query(createDbQuery, (err) => {
        if (err) console.error('Error creating database:', err);
        else console.log('Database created/exists');
    });

    connection.query(useDbQuery);
};

const createUserTable = () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20) NOT NULL,
      profile_picture VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

    // Use query() instead of execute() for table creation
    connection.query(createTableQuery, (err) => {
        if (err) console.error('Error creating table:', err);
        else console.log('Users table created/exists');
    });
};

module.exports = { connection, createDatabase, createUserTable };
