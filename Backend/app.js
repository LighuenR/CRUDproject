const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser')
const cors = require('cors')

// From files
const { MONGODB } = require('./config');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(bodyParser.json());

// Task Routes
app.use('/api/task',taskRoutes);
app.use(cors())

// Conect to te DB
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb');
        return app.listen(3300);
    })
    .then(() => console.log('server running at 3300'))
    .catch(err => console.log(err.message));