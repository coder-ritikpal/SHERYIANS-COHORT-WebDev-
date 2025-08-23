const jwt = require("jsonwebtoken");

function authUser(req, res, next) {
    const token = req.cookies.token; // read token from cookie

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports ={
    authUser
};
