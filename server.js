const express = require('express')
const mongoose = require('mongoose')


const app = express()
const port = 3000
const url = "mongodb://localhost:27017/persons"
mongoose.connect(url, {})
    .then(result => console.log("database connected"))
    .catch(err => console.log(err))


app.listen(port, () =>
{console.log("server is running at port" + port)}
)
app.get('/', (req, res) => {
    res.send("<h1>Hello from nodejs app</h1>")
});


/*import { connectToMongo } from "./mongo models/conn.js";

import mongoose from 'mongoose';
import User from './mongo models/user.model.js';
import Resto from './mongo models/resto.model.js';
import Review from './src/models/review.model.js';*/
