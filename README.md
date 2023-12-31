# MCO-CCAPDEV
<h1>Introduction</h1>
<p>The group wanted to create a website that is helpful for the current and future students of DLSU. A local food review website would boost community interactions and help students be informed about all the various food items available in the university while being able to provide feedback on their experiences. A great help for people who aren’t sure what to eat for their next meal and for people who are hesitant to purchase new food that they haven’t tried before.</p>
<br>
<h1>Description of the Web Application</h1>
<ul>
  <li>User Account (Log-in, Log-out, Register) – The proposed web application will allow the user to create a user profile, for them to save certain posts as well and view posts non-anonymously.</li>
  <li>User Profile (Create, Read, Update) – The users are also given their own user
profile page. From here, they have the option to write and edit their own bio A user would be able to see their previous reviews from different establishments.</li>
  <li>View Establishments (View Top Reviews, Open Full Reviews, View Review
Ratings) - Users are able to view establishments within DLSU Agno along with
photographs of the area and the items that they are able to order with prices.
Below the establishments, users are able to view reviews from registered users
that can be filtered from the latest date or with the ratio of helpful/unhelpful
ratings from the reviews. If ever a review surpasses a certain character limit, the
user would not be able to view the whole review from the establishment page so
they would have to view the full review post to read the whole thing. Users are
also given the feature to determine if a review is helpful or not with two buttons
beside the review along with a counter for the number of people finding the
review helpful or not.</li>
  <li>Create Review - Only registered users are allowed to create a review. In creating
a review it must contain a title and a body along with a metric system using 5
stars that are in the design of the DLSU star.</li>
<h1>Running through node js<h1>
<p>To run the website, open your command prompt firstly. Change the path to the main folder. After that run server file by inputting "node index.js". Make sure to install all the needed dependencies such as express, npm, and mongoose . This is found in the package.json file. The file should say that it has connected to the port and database with and admin user made. Then dont forget to install the premade json files with the starting restaurants called persons.establishment.json and upload it in the mongodb database. After that open the link "http://localhost:3000" to get started on the signin page<p>
<p>Dependecies List:<p>
<p>
                "@google-cloud/storage": "^7.7.0",
                "assert": "^2.1.0",
                "body-parser": "^1.20.2",
                "chai": "^4.3.10",
                "cloudinary": "^1.41.0",
                "dotenv": "^16.3.1",
                "ejs": "^3.1.9",
                "express": "^4.18.2",
                "express-fileupload": "^1.4.2",
                "express-session": "^1.17.3",
                "firebase-admin": "^11.11.1",
                "firebase-functions": "^4.5.0",
                "mongo": "^0.1.0",
                "mongodb": "^6.2.0",
                "mongodb-memory-server": "^9.0.1",
                "mongoose": "^8.0.0",
                "multer": "^1.4.5-lts.1",
                "path": "^0.12.7",
                "uuid": "^9.0.1"
<p>
</ul>

