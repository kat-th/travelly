const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin',
    }),
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true,
        },
    }),
);

const routes = require('./routes');
app.use(routes);

// const path = require('path');

// // Serve static files from the React app (Vite build)
// app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

// // Serve index.html for any route not handled by your API
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
// });

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = 'Resource Not Found';
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    const statusCode = err.status || 500;
    console.error(err);
    const errorResponse = {
        message: err.message,
        errors: err.errors,
    };
    if (err.status !== 400) {
        errorResponse.title = err.title || 'Server Error';
        errorResponse.stack = isProduction ? null : err.stack;
    }
    res.status(statusCode).json(errorResponse);
});

module.exports = app;
