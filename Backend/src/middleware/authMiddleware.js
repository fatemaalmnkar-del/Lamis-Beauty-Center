const jwt= require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        //No token provided'
        if(!authHeader){
            return res.status(401).json({ message: 'Bitte melden Sie sich an.' });
        }
        //Invalid token format
        const parts = authHeader.split(" ");
        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.status(401).json({ message: 'Die Anmeldedaten sind ungültig. Bitte melden Sie sich erneut an.' });
        }
        const token = parts[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        //Invalid token
        return res.status(401).json({ message: 'Ihre Sitzung ist ungültig oder abgelaufen. Bitte melden Sie sich erneut an.' });
    }
};
module.exports = { protect };