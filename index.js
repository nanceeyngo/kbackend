const express = require("express");  
const mongoose = require("mongoose");  
const bodyParser = require("body-parser");
const dotenv = require('dotenv'); 
// Import both Waitlist and ContactForm models  
const { Waitlist, ContactForm } = require("./waitlist"); 
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
app.get("/", (req, res) => {  
    res.sendFile(__dirname + "/Views/index.html");  
});  

// Post a new entry to the waitlist  
app.post("/waitlist", async (req, res) => {  
    const {  
        fullName,  
        farmName,  
        farmLocation,  
        email,  
        phone,  
        farmSize,  
        produceTypes,  
        supplyFrequency,  
        distributionChannels,  
        additionalOfferings,  
        mainChallenges,  
        receiveUpdates,  
    } = req.body;  

    const produceTypesArray = Array.isArray(produceTypes) ? produceTypes : [produceTypes];  
    const distributionChannelsArray = Array.isArray(distributionChannels) ? distributionChannels : [distributionChannels];  

    const newEntry = new Waitlist({  
        fullName,  
        farmName,  
        farmLocation,  
        email,  
        phone,  
        farmSize,  
        produceTypes: produceTypesArray,  
        supplyFrequency,  
        distributionChannels: distributionChannelsArray,  
        additionalOfferings,  
        mainChallenges,  
        receiveUpdates  
    });  

    try {  
        await newEntry.save();  
        console.log("Waitlist data saved!");  
        res.sendFile(__dirname + "/Views/waitlist-success.html");  
    } catch (err) {  
        console.error("Error saving waitlist data:", err);  
        res.status(500).send("Error saving data");  
    }  
});  

// Get the contact page  
app.get("/contact", (req, res) => {  
    res.sendFile(__dirname + "/Views/contact.html");  
});  

// Post a contact form entry  
app.post("/contact", async (req, res) => {  
    const { name, email, message } = req.body;  

    const newContact = new ContactForm({  
        name,  
        email,  
        message  
    });  

    try {  
        await newContact.save();  
        console.log("Contact form data saved!");  
        res.sendFile(__dirname + "/Views/contact-success.html");  
    } catch (err) {  
        console.error("Error saving contact form data:", err);  
        res.status(500).send("Error saving data");  
    }  
});  

app.listen(port, () => {  
    console.log(`Server listening on port ${port}`);  
});