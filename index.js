const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer'); 
//const csrf = require('csurf');

//This file has all the functions corresponding to the mongodb and the html files, check the HTML and css for the changes

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

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(csrf({ cookie: true }));
// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });


const createAdminUser = async () => {          //     <------ Follow this style
  const adminUsername = 'admin';
  const adminPassword = '123';

  try {
    const adminUser = await User.findOne({ username: adminUsername });

    if (!adminUser) {
      const newAdmin = new User({ username: adminUsername, password: adminPassword, email: "admin@gmail.com", role: 'Admin' });
      await newAdmin.save();
      console.log('Admin user created:', newAdmin);
    } else 
      console.log("Admin has been made");
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

app.get('/', async (req, res) => {
  try {
    const establishments = await Establishment.find();
    res.render('feed-guest', { establishments });
  } catch (error) {
    console.error('Error getting establishments:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/adminpage', async (req, res) => {                                    // opens guest feed
  try {
    const establishments = await Establishment.find();
    const users = await User.find();
    res.render('adminpage', { establishments, users, username:loggedInUser.username,avatar:loggedInUser.avatar});
  } catch (error) {
    console.error('Error getting establishments:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/feed-admin', async (req, res) => {                                    // opens guest feed
  //res.sendFile(path.join(__dirname, 'public', 'feed-guest.html'));
  const establishments = await Establishment.find();

  res.render('feed-admin', { username : loggedInUser.username, avatar : loggedInUser.avatar, establishments});
});


app.get('/signin', (req, res) => {                         
    //res.sendFile(path.join(__dirname, 'public', 'signin.html'));
    res.render('signin');

});

app.get('/feed', async (req, res) => {                              // opens feed html  

  const establishments = await Establishment.find();


    res.render('feed' , { username : loggedInUser.username, avatar : loggedInUser.avatar, establishments});
});


app.get('/establishment', (req,res) => {
  res.render('establishment')
});

app.get('/establishments/:id', async (req, res) => {
  try {
      const establishmentId = req.params.id;
      const establishment = await Establishment.findById(establishmentId);
      const reviews = await Review.find({ establishment: establishmentId });

      res.render('establishment', {establishment, reviews, loggedInUser});
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

      const establishments = await Establishment.find();

      console.log("Logged in User:", loggedInUser, establishments);
      if(loggedInUser.role == 'User')
        res.render('feed', {username : loggedInUser.username, avatar: loggedInUser.avatar, establishments});
      else 
        if(loggedInUser.role == 'Admin')
          res.render('feed-admin', {username : loggedInUser.username, avatar: loggedInUser.avatar, establishments});
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

      console.log(loggedInUser)
      if (loggedInUser.role == 'User'){
        res.render('useraccount', {username: loggedInUser.username, avatar: loggedInUser.avatar});
      } else if (loggedInUser.role == 'Admin') {
        res.render('adminpage', {username: loggedInUser.username, avatar: loggedInUser.avatar});
      }
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
        if (loggedInUser.role == 'User'){
          res.render('useraccount', {username: loggedInUser.username, avatar: loggedInUser.avatar});
        } else if (loggedInUser.role == 'Admin') {
          res.render('adminpage', {username: loggedInUser.username, avatar: loggedInUser.avatar});
        }
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

app.post('/establishments/:id/reviews', async (req, res) => {
    const { rating, title, body } = req.body;
    const establishmentId = req.params.id;
    const csrfToken = req.body._csrf || req.headers['csrf-token'];
    if (!csrfToken || !csurf.verify(csrfToken, req)) {
            // If the CSRF token is missing or invalid, handle accordingly
            return res.status(403).send('Invalid CSRF token');
        }
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

