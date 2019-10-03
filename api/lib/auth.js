const jwt = require('jsonwebtoken');

const JWT_SECRET = 'BIMBIMBIM';

const createToken = data => jwt.sign({ data }, JWT_SECRET, { expiresIn: '30d', algorithm: 'HS256' });
const validateToken = async token => await jwt.verify(token, JWT_SECRET);

const extractToken = async req => {
	const { authorization } = req.headers;
	const token = authorization.split('Bearer ')[1];
	req.decoded = await jwt.verify(token, JWT_SECRET);
};

const protectedRoute = async (req, res, next) => {
	try {
		await extractToken(req);
		next();
	} catch (err) {
		res.status(403).json(err);
	}
};

const getCurrentUserId = req => req.decoded.data.userId;

module.exports = { createToken, extractToken, getCurrentUserId, protectedRoute, validateToken };