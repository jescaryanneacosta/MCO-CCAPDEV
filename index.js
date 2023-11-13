const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

//Memory server thing so data doesnt get saved

const { describe, before, after, it } = require('mocha');
const assert = require('assert');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

before(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); 
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Here end Delete after tests

const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/persons";

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(url, {})
    .then(result => console.log("database connected"))
    .catch(err => console.log(err))


const User = require('./mongo model/user.model')    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.get('/', (req, res) => {                                    // opens guest feed
    res.sendFile(path.join(__dirname, 'public', 'feed-guest.html'));
});

app.get('/signin', (req, res) => {                         
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/feed', (req, res) => {                              // opens feed html
    res.sendFile(path.join(__dirname, 'public', 'feed.html'));
});

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.send('User does not exist');
      }
  
      if (user.password !== password) {
        return res.send('Incorrect password');
      }
  
      // Redirect to the main page on successful login
      res.redirect('/feed');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
      const existingEmail = await User.findOne({email});
  
      if (existingUser) {
        return res.send('Username already exists');
      }

      if (existingEmail) {
        return res.send('Email is already being used');
      }

      const newUser = new User({ username, email, password });
      await newUser.save();
  
      // Redirect to the main page on successful signup
      res.redirect('/signin');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
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

