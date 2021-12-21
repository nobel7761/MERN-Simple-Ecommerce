const { Schema, model } = require('mongoose'); //using object destructuring method we took only Schema and model from mongoose
const joi = require('joi'); //for validation
const jwt = require('jsonwebtoken'); //for creating token

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024 //because after hashing the password it will be a huge string
    }
}, { timestamps: true });


//validation with joi
const validateUser = user => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().min(5).max(255).required(),
        password: joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

//generating token with payloads
userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    return token;
}

module.exports.User = model('User', userSchema);
module.exports.validate = validateUser;