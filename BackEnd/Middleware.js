const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

function authenticateToken(req,res,next){
    const token = req.headers["authorization"].split(" ")[1];

    if(!token){
        return res.status(403).json({
            error: "Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token,jwtPassword);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(400).json({
            error: "Invalid token"
        })
    }
}

module.exports = authenticateToken