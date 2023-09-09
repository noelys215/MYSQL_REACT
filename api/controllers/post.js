import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getPosts = (req, res) => {
	const q =
		userId !== 'undefined'
			? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
			: `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
ORDER BY p.createdAt DESC`;

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data);
	});
};
