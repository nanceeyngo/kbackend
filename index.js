const express = require("express");  
const mongoose = require("mongoose");  
const bodyParser = require("body-parser");
const dotenv = require('dotenv'); 
const { getHomePage, farmerWaitlist, getWaitlistPage, getThankYouPage } = require("./controllers/waitlistController"); // Updated to import getWaitlistPage
const farmerDetails = require("./validators/waitlist");  //  validation schema 
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

  




// Get home page   
app.get("/", getHomePage); 


// Get waitlist page   
app.get("/waitlist", getWaitlistPage);



// Post a new entry to the waitlist page  
app.post("/waitlist", farmerWaitlist);  

// Thank you page  
app.get("/thankYou", getThankYouPage);


app.listen(port, () => {  
    console.log(`Server listening on port ${port}`);  
});