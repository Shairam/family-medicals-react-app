const jwt = require("jsonwebtoken");

TOKEN_KEY = "6f9f4a6762c19cd8d79b4812985154ba47f6df058dcfe4833ee00266650feb23fd1d1bccaea4fb779aa9bc5029d8ea47"

const verifyToken = (req, res, next)=>{
    const fullToken = 
    req.headers["authorization"];
    if (!fullToken) return res.sendStatus(401);
    const token = fullToken.split(" ")[1]

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        _ = jwt.verify(token, TOKEN_KEY)
    } catch (error) {
        return res.status(403).send("Invaid token");
    }
    return next();
}

module.exports = verifyToken