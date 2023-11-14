const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

//This file has all the functions corresponding to the mongodb and the html files, check the HTML and css for the changes
// since we have to adjust various small details to get it to work. 
// Look to signin html and sign up for the changes

//Memory server thing so data doesnt get saved
/* 
    What this does basically is create a temporary server where the data we use during a specific session
    is only stored on that temporary server so its like a temporary database and once we are done it erases the stuff 
    and resets the values. However we should delete this before submitting since sir wants a working databases that actually
    stores so we just use this memory server stuff for tests.


    Go to command prompt then make sure you have all the dependencies installed, check in package.json

    Then after that change the path to the root depository 

    After, type in the line "npm test", this opens the server and database (KEEP IN MIND THIS IS JUST FOR THE TEMPORARY SERVER)

    go to ur web and type http://localhost:3000 and theres the start of the website
    
    Once we are done with this temporary stuff, we run the command prompt again with the same path but use "node index.js"

*/

// Here Start 

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
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Here end Delete after tests

const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/persons";

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'public'));

mongoose.connect(url, {})
    .then(result => console.log("database connected"))
    .catch(err => console.log(err))


const User = require('./mongo model/user.model')    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.get('/useraccount', (req, res) => {                                    // opens useraccount
    //res.sendFile(path.join(__dirname, 'public', 'useraccount.html'));
    res.render('useraccount');
});

app.get('/', (req, res) => {                                    // opens guest feed
    //res.sendFile(path.join(__dirname, 'public', 'feed-guest.html'));
    res.render('feed-guest');

});

app.get('/signin', (req, res) => {                         
    //res.sendFile(path.join(__dirname, 'public', 'signin.html'));
    res.render('signin');

});

app.get('/feed', (req, res) => {                              // opens feed html
    //res.sendFile(path.join(__dirname, 'public', 'feed.html'));
    res.render('feed');
});

let loggedInUser = null;


  app.post('/logout', (req, res) => {
        loggedInUser = null;
        console.log("Logged In User:", loggedInUser);
        res.redirect('/');
    });

  app.post('/login', async (req, res) => {          //log in function
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.send('User does not exist');
      }
  
      if (user.password !== password) {
        return res.send('Incorrect password');
      }

      loggedInUser = user; 
      // Redirect to the main page on successful login
      //res.redirect('/feed');

      console.log("Logged in User:", loggedInUser);
      res.render('feed', {username : loggedInUser.username, avatar: loggedInUser.avatar});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/changeUsername', async (req, res) => {
    const {username} = req.body;
  
    try {
      const existingUser = await User.findOne({username});  
      if (existingUser) {
        return res.send('Username already exists');
      }

      loggedInUser.username = username;

      console.log(loggedInUser)

      res.render('useraccount', {username: loggedInUser.username, avatar: loggedInUser.avatar});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/signup', async (req, res) => {            //signup function
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
      //res.redirect('/signin');
      res.render('signin');
      console.log(newUser);
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

