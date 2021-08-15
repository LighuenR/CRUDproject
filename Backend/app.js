const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors());
const bodyParser =  require('body-parser')


// From files
const { MONGODB } = require('./config');
const taskRoutes = require('./routes/tasks');

app.use(bodyParser.json());

// Task Routes
app.use('/api/task',taskRoutes);

// Conect to te DB
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb');
        return app.listen(3300);
    })
    .then(() => console.log('server running at 3300'))
    .catch(err => console.log(err.message));