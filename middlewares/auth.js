const jwt = require('jsonwebtoken');
const config = require('../config');

const { JWT_SECRET } = config;

module.exports = (permission) => (req, res, next) => {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) { return res.status(401).json({message:'Missing credentials'}); }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Verify permissions
        const { permissions } = jwt.decode(token);

        if (!permissions || !permissions.includes(permission)) {
            return res.status(403).json({ message: `Missing permission ${permission}`});
        }

        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({message: e.message || 'Something went wrong'});
    }
};