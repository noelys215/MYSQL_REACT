import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getRelationships = (req, res) => {
	const q = 'SELECT followerUserId FROM relationships WHERE followedUserId = ?';

	db.query(q, [req.query.followedUserId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data.map((relationship) => relationship.followerUserId));
	});
};

export const addRelationship = (req, res) => {};

export const deleteRelationship = (req, res) => {};
