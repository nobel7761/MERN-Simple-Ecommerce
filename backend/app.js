require('express-async-errors'); //for handle all the errors
const express = require('express');
const app = express();
const cors = require('cors'); //for cross platform communication
const morgan = require('morgan'); //to check the request status

//middlewares
const error = require('./middlewares/error');

//routers
const userRouter = require('./routers/userRouter');

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/user', userRouter);
app.use(error);

module.exports = app;