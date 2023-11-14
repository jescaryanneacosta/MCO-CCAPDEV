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
const Review = require('./mongo model/review.model');

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
    } else {
      console.log("Admin has been made:", newAdmin);
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminUser();

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
  res.render('establishment',
  {
    username:
    loggedInUser.username, avatar: 
    loggedInUser.avatar
  })
});

app.get('/establishments/:id', async (req, res) => {
  try {
      const establishmentId = req.params.id;
      const establishment = await Establishment.findById(establishmentId);
      const reviews = await Review.find({ establishment: establishmentId });

      res.render('establishment', { establishment, reviews });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
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
app.post('/establishments/:id/reviews', async (req, res) => {
    const { rating, title, body } = req.body;
    const establishmentId = req.params.id;
    // Additional validation can be added here

    try {
        const newReview = new Review({
            establishment: establishmentId,
            // Include user details, e.g., from session or logged-in user
            rating,
            title,
            body,
            datePosted: new Date()
        });

        await newReview.save();
        res.render('/establishments/' + establishmentId); // Redirect back to establishment page
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting review');
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

