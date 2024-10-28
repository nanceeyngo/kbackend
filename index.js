const express = require("express");  
const mongoose = require("mongoose");  
const bodyParser = require("body-parser");
const dotenv = require('dotenv'); 

const path = require('path'); // Import path module for resolving directory paths  

const { getHomePage, farmerWaitlist, getThankYouPage } = require("./controllers/waitlistController"); // Updated to import getWaitlistPage

// Import both Waitlist and ContactForm models  

require('dotenv').config(); 

const app = express();  
const port = process.env.PORT || 3000;  
//Connect Database
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to database') 
}).catch(err => console.error(err));


// Middleware  
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(express.json());  
app.use(express.static("public"));  

// Set the view engine to EJS  
app.set('view engine', 'ejs');  

// Set the views directory (optional, defaults to '/views')  
app.set('views', path.join(__dirname, 'views'));  

  




// Get home page   
app.get("/", getHomePage); 



// Serve the waitlist form with EJS  
app.get('/waitlist', (req, res) => {  
    res.render('waitlist'); // Assuming 'waitlist.ejs' is in the views directory  
}); 

// Post a new entry to the waitlist page  
app.post("/waitlist", farmerWaitlist);  

// Thank you page  
app.get("/thankYou", getThankYouPage);


app.listen(port, () => {  
    console.log(`Server listening on port ${port}`);  
});