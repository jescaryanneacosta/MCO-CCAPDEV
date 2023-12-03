const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer'); 

//This file has all the functions corresponding to the mongodb and the html files, check the HTML and css for the changes

const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/persons";

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

mongoose.connect(url, {})
    .then(result => console.log("database connected"))
    .catch(err => console.log(err))


const User = require('./mongo model/user.model')    
const Establishment = require("./mongo model/resto.model")
const Review = require('./mongo model/review.model');

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));


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

app.get('/useraccount', async (req, res) => {                                    // opens useraccount
    const reviews = await Review.find({ username: loggedInUser.username });
    res.render('useraccount' , { username : loggedInUser.username, avatar : loggedInUser.avatar, reviews });
});

app.get('/', async (req, res) => {
  try {
    const establishments = await Establishment.find();
    res.render('feed-guest', { establishments, loggedInUser});
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
  const establishments = await Establishment.find();
  res.render('feed-admin', { username : loggedInUser.username, avatar : loggedInUser.avatar, establishments});
});


app.get('/signin', (req, res) => {                         
    res.render('signin');
});

app.get('/feed', async (req, res) => {                              
  const establishments = await Establishment.find();
  res.render('feed' , { username : loggedInUser.username, avatar : loggedInUser.avatar, establishments});
});

app.get('/establishments/:id/reviews', async (req, res) => {
  try {
    const establishmentId = req.params.id;
    const establishment = await Establishment.findById(establishmentId);
    const reviews = await Review.find({ establishment: establishmentId });

    res.render('/establishments/${establishmentId}', { establishment, reviews, baseUrl: '/MCO-CCAPDEV/public', loggedInUser });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.get('/establishment', (req,res) => {
  res.render('establishment')
});

app.get('/establishments/:id', async (req, res) => {
  try {
      const establishmentId = req.params.id;
      const establishment = await Establishment.findById(establishmentId);
      const reviews = await Review.find({ establishment: establishmentId });

      if(loggedInUser == null)
        loggedInUser = 1;

      res.render('establishment', {establishment, reviews, loggedInUser, baseUrl: '/MCO-CCAPDEV/public'});
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

  app.post('/login', async (req, res) => {
      const { username, password } = req.body;
  
      try {
          const user = await User.findOne({ username });
  
          if (!user) {
              return res.render('signin', { error: 'User does not exist' });
          }
  
          if (user.password !== password) {
              return res.render('signin', { error: 'Incorrect password' });
          }
  
          loggedInUser = user;
          
          // Redirect based on user role
          if(loggedInUser.role == 'User')
              res.redirect(`/feed`);
          else if(loggedInUser.role == 'Admin')
              res.redirect(`/feed-admin`);
      } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
      }
  });
  
  app.post('/banuser', async (req, res) => {          //log in function
    const {user} = req.body;
    console.log(user)
  
    try {
      const userToDelete = await User.findOne({username : user});
      console.log("User to delete:", userToDelete);

  
      if (!userToDelete) {
        return res.send('User does not exist');
      }
      if (userToDelete && userToDelete.role == 'User') {
        await User.deleteOne({ _id: userToDelete._id });
      }

      const users = await User.find();
      const establishments = await Establishment.find();


      //res.render('adminpage',{avatar: loggedInUser.avatar, users, establishments});
      res.redirect(`/adminpage`);

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/deleteestablishment', async (req, res) => {          //log in function
    const {name} = req.body;
    console.log(name)
  
    try {
      const establishmentToDelete = await Establishment.findOne({name : name});
      console.log("User to delete:", establishmentToDelete);
  
      if (!establishmentToDelete) {
        return res.send('Establishment does not exist');
      }
      if (establishmentToDelete) {
        await Establishment.deleteOne({ _id: establishmentToDelete._id });
      }

      const users = await User.find();
      const establishments = await Establishment.find();

      //res.render('adminpage',{avatar: loggedInUser.avatar, users, establishments});
      res.redirect(`/adminpage`);

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

      const reviews = await Review.find({ username: loggedInUser.username });

      reviews.forEach(function(review) {
        review.username = username;
        review.save();
      });
    
      loggedInUser.username = username;
      await loggedInUser.save();      

      console.log(loggedInUser)
      //res.render('useraccount', {username: loggedInUser.username, avatar: loggedInUser.avatar, reviews});
      res.redirect(`/useraccount`);

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.post('/changePassword', async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        if (loggedInUser.password !== oldPassword) {
            const reviews = await Review.find({ username: loggedInUser.username });
            return res.render('useraccount', { 
                username: loggedInUser.username, 
                avatar: loggedInUser.avatar, 
                reviews,
                error: 'Incorrect old password' 
            });
        }

        loggedInUser.password = newPassword;
        await loggedInUser.save();

        res.redirect('/useraccount');
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


        const reviews = await Review.find({ username: loggedInUser.username });
        console.log(loggedInUser)
        if (loggedInUser.role == 'User'){
          //res.render('useraccount', {username: loggedInUser.username, avatar: loggedInUser.avatar, reviews});
          res.redirect('/useraccount');
        } else if (loggedInUser.role == 'Admin') {
          //res.render('adminpage', {username: loggedInUser.username, avatar: loggedInUser.avatar});
          res.redirect(`/adminpage`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });

  app.post('/addestablishment', upload.single('avatar'), async (req,res) => {

    const {name, location, cuisine, popularitems, category, description} = req.body;

    const avatar = 'images/' + req.file.filename;

    try {

      const existingResto = await Establishment.findOne({name});
      if (existingResto) {
        return res.send('Establishment already exists');
      }

      const newResto = new Establishment ({
        name: name,
        popularitems: popularitems,
        avatar: avatar,
        images: [],
        category: category,
        cuisine: cuisine,
        description: description,
        location: location
      })
      await newResto.save();

      console.log(newResto);

      const users = await User.find();
      const establishments = await Establishment.find();

      //res.render('adminpage',{avatar: loggedInUser.avatar, users, establishments});
      res.redirect('/adminpage');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
  });

  app.post('/updateestablishment', upload.single('avatar'), async (req,res) => {

    const {old_name, new_name,  location, cuisine, popularitems, category, description} = req.body;

    const avatar = 'images/' + req.file.filename;

    try {

     
          const existingResto = await Establishment.updateOne({name : old_name}, {$set : {name: new_name,
          popularitems: popularitems,
          avatar: avatar,
          images: [],
          category: category,
          cuisine: cuisine,
          description: description,
          location: location}});

        if (existingResto.name == old_name) {
          return res.send('Establishment does not exist');
        }


      const users = await User.find();
      const establishments = await Establishment.find();

      //res.render('adminpage',{avatar: loggedInUser.avatar, users, establishments});
      res.redirect('/adminpage');
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
  
      res.render('signin');
      console.log(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

app.post('/establishments/:id', async (req, res) => {
    const { rating, title, body } = req.body;
    const establishmentId = req.params.id;
    
    try {

        const establishment = await Establishment.findById(establishmentId);

        if (!establishment) {
            return res.status(404).send('Establishment not found');
        }

        if(!loggedInUser){
          return res.status(404).send('You are not logged in');
        }

        if(loggedInUser.role == 'Admin') {
          return res.status(404).send('Admins cannot make reviews');

        }

        const newReview = new Review({
            user : loggedInUser._id,
            username : loggedInUser.username,
            establishment: establishment,
            rating : rating,
            title : title,
            body : body,
            datePosted: new Date(),
            userAvatar: loggedInUser.avatar
        });

        await newReview.save();
        loggedInUser.likes.push(newReview);
        loggedInUser.save();

        console.log(loggedInUser.likes)
        res.redirect(`/establishments/${establishment._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting review, Check if you are logged in');
    }
  });

mongoose.connect(url)
app.listen(port, () =>
{console.log("server is running at port" + port)}
)
