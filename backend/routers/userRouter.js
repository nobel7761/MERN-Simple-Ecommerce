const router = require('express').Router();
const { signUp, signIn, Me } = require('../controllers/userController');
const authorization = require('../middlewares/authorization');

router.route('/signup')
    .post(signUp)
router.route('/signin')
    .post(signIn)
router.route('/me')
    .get(authorization, Me) //this link will be accessible only when user will be logged in. (have to provide token when access this link from postman)

module.exports = router;