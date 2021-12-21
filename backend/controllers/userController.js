const { validate, User } = require('../models/user');
const bcrypt = require('bcrypt'); //bcrypt package for password hashing
const _ = require('lodash'); //lodash package for pick specific data from object

module.exports.signUp = async (req, res) => {
    const { error } = validate(req.body) //validation check
    if (error) return res.status(400).send(error.details[0].message);

    let user = {};
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email Exists!");

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    //password hashing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //direct login when a user will signup and then token generate
    const token = user.generateJWT();

    const result = await user.save();
    return res.status(201).send({
        message: "Sign Up Successful!",
        token: token,
        user: _.pick(result, ['_id', 'name', 'email'])
    });
}

module.exports.signIn = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email Not Found!!!");

    let userPass = bcrypt.compare(req.body.password, user.password);
    if (!userPass) return res.status(400).send("Wrong Password!!!");

    //after successful login generate token
    const token = user.generateJWT();

    return res.status(200).send({
        message: "Login Successful",
        token: token,
        user: _.pick(user, ['_id', 'name', 'email'])
    })

}

//logged in user will see his/her data
module.exports.Me = async (req, res) => {
    return res.status(200).send(req.user);
}