const express = require('express');
const bodyParser = require('body-parser');

const placesRoute = require('./routes/places-routes');
const usersRoute = require('./routes/users-routes');

const app = express();

app.use('/api/places', placesRoute);
app.use('/api/users', usersRoute);

app.listen(5000);