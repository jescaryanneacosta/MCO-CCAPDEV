const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/persons";

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(url, {})
    .then(result => console.log("database connected"))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

mongoose.connect(url)
app.listen(port, () =>
{console.log("server is running at port" + port)}
)


/*import { connectToMongo } from "./mongo models/conn.js";

import mongoose from 'mongoose';
import User from './mongo models/user.model.js';
import Resto from './mongo models/resto.model.js';
import Review from './src/models/review.model.js';*/

