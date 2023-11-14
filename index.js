const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer'); 

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
/*
const { describe, before, after, it } = require('mocha');
const assert = require('assert');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

before(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); 
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });


  const adminUsername = 'admin';
  const adminPassword = '123';

  const adminUser = await User.findOne({ username: adminUsername });

  if (!adminUser) {
    const newAdmin = new User({ username: adminUsername, password: adminPassword, role: 'Admin'});
    await newAdmin.save();
    console.log('Admin user created:', newAdmin);
  }


});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});
*/
// Here end Delete after tests
/*
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

const Establishment = require("./mongo model/resto.model")

newEstablishment.save((err, savedEstablishment) => {
  if (err) {
    console.error('Error saving establishment:', err);
  } else {
    console.log('Establishment saved successfully:', savedEstablishment);
  }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

const createAdminUser = async () => {          //     <------ Follow this style
  const adminUsername = 'admin';
  const adminPassword = '123';

  try {
    const adminUser = await User.findOne({ username: adminUsername });

    if (!adminUser) {
      const newAdmin = new User({ username: adminUsername, password: adminPassword, email: "admin@gmail.com", role: 'Admin' });
      await newAdmin.save();
      console.log('Admin user created:', newAdmin);
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminUser();

//Do it here 

const newEstablishment = new Establishment({
  name: 'McDonalds',
  role: 'Resto',
  avatar: '/static/images/default-avatar.jpg',
  images: [],
  category: 'Fast Food',
  cuisine: 'American',
  description: 'McDonalds is a globally renowned fast-food restaurant chain known for its iconic golden arches logo and its wide range of fast-food offerings. McDonalds menu typically includes items such as hamburgers, cheeseburgers, chicken sandwiches, french fries, and breakfast items like the Egg McMuffin.',
  location: '2399 Taft Ave, Malate, Manila, 1004 Metro Manila',
  rating: 0,
});

try {
  const existingEstablishment = await Establishment.findOne({ name: newEstablishment.name });

  if (!existingEstablishment) {
    await newEstablishment.save();
    console.log('Establishment created:', newEstablishment);
  } else {
    console.log('Establishment with the same name already exists:', existingEstablishment);
  }

  //then do it again for the remaining restos we hard coded
};

try {

  do it again for the rest of the establishments

}

createEstablishments(); 

*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


//ROUTINGS

app.get('/useraccount', (req, res) => {                                    // opens useraccount
    //res.sendFile(path.join(__dirname, 'public', 'useraccount.html'));
    res.render('useraccount' , { username : loggedInUser.username, avatar : loggedInUser.avatar });
});

app.get('/', (req, res) => {                                    // opens guest feed
    //res.sendFile(path.join(__dirname, 'public', 'feed-guest.html'));
    res.render('feed-guest');

});

app.get('/adminpage', (req, res) => {                                    // opens guest feed
  //res.sendFile(path.join(__dirname, 'public', 'feed-guest.html'));
  res.render('adminpage', { username : loggedInUser.username, avatar : loggedInUser.avatar });

});

app.get('/feed-admin', (req, res) => {                                    // opens guest feed
  //res.sendFile(path.join(__dirname, 'public', 'feed-guest.html'));
  res.render('feed-admin', { username : loggedInUser.username, avatar : loggedInUser.avatar });
});


app.get('/signin', (req, res) => {                         
    //res.sendFile(path.join(__dirname, 'public', 'signin.html'));
    res.render('signin');

});

app.get('/feed', (req, res) => {                              // opens feed html
    //res.sendFile(path.join(__dirname, 'public', 'feed.html'));
    res.render('feed' , { username : loggedInUser.username, avatar : loggedInUser.avatar });
});


app.get('/establishment', (req,res) => {
  res.render('establishment')
});

// END ROUTES

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
      if(loggedInUser.role == 'User')
        res.render('feed', {username : loggedInUser.username, avatar: loggedInUser.avatar});
      else 
        if(loggedInUser.role == 'Admin')
          res.render('feed-admin', {username : loggedInUser.username, avatar: loggedInUser.avatar});
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
      await loggedInUser.save();

      console.log(loggedInUser)
      res.render('useraccount', {username: loggedInUser.username, avatar: loggedInUser.avatar});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.post('/changePassword', async (req, res) => {          //log in function
    const { username, oldPassword, newPassword } = req.body;
  
    try {
  
      if (loggedInUser.password !== oldPassword) {
        return res.send('Incorrect password');
      } else {
        loggedInUser.password = newPassword;
        await loggedInUser.save();
      }
    
      console.log(loggedInUser)
      res.render('useraccount', {username: loggedInUser.username, avatar: loggedInUser.avatar});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.post('/changeProfilePic', upload.single('profilePic'), async (req, res) => {

    console.log('Uploaded File:', req.file);

    const avatar = 'images/' + req.file.filename;
    try {
        loggedInUser.avatar = avatar;
        await loggedInUser.save();

        console.log(loggedInUser)
        res.render('useraccount', { username: loggedInUser.username, avatar: loggedInUser.avatar });
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

