//this will handle all the error of our code
module.exports = (err, req, res, next) => {
    return res.status(500).send("Something Wrong!!!");
}