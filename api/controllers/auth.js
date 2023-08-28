import { db } from '../connect.js';

export const register = (req, res) => {
	//CHECK IF USER EXISTS
	const q = 'SELECT FROM users WHERE username = ?';

	db.query(q, [req.body.username], (err, data) => {
		if (err) return res.status(500).json(err);
		if (data.length) return res.status(409).json('User Exists');
	});
	//CREATE USER
	//HASH PASSWORD
};

export const login = (req, res) => {
	//TODO
};

export const logout = (req, res) => {
	//TODO
};
