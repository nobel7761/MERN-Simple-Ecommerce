//authorization code.

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(400).send("No Token Found!!!"); //if no token stored then "No Token Found!"

    token = token.split(" ")[1].trim();//splitting token from "bearer <token>"
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY); //verify token with JWT_SECRET_KEY(because token was generated with the help of JWT_SECRET_KEY)
        req.user = decoded; //after verifying token, all the payloads that was send in user model will be stored
    }
    catch (error) {
        return res.status(400).send("Invalid Token!!!"); //if wrong token stored then Invalid Token
    }




    next();
}