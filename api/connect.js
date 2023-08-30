import mysql from 'mysql';
import dotenv from 'dotenv/config';

export const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.MYSQL_PASS,
	database: 'social',
});

db.connect((err) =>
	err ? console.log('Database Connection Failed', err) : console.log('Database Connected')
);
