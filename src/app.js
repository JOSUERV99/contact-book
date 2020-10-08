const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const DEFAULT_PORT = 3000;

mongoose.connect( 'mongodb://localhost/contacts')
    .then(db => console.log("Database connected"))
    .catch(err => console.log(err));

/* imports */
const indexRoutes = require('./routes/index');

/* settings */
// to use the port that the server give us else use the default port
app.set('port', process.env.PORT || DEFAULT_PORT);
// set the views directory (that because we use src dir instead of using the root dir)
// use path module to join the dir name without changes per current os
app.set('views', path.join(__dirname, 'views'));
// templates engine 
app.set('view engine', 'ejs');


/* middlewares */
// response and request info
app.use(morgan('dev'));
// to save data
app.use(express.urlencoded({extended : false}));

/* routes */
// use the views in this file
app.use('/', indexRoutes);

// starting the server...
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});