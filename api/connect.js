import mysql from 'mysql';

export const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Casa1992!',
	database: 'social',
});
