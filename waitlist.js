  const mongoose = require("mongoose");  

// Define the schema for the waitlist  
const waitlistSchema = new mongoose.Schema({  
    fullName: {  
        type: String,  
        required: true,  
    },  
    farmName: {  
        type: String,  
        required: true,  
    },  
    farmLocation: {  
        type: String,  
        required: true,  
    },  
    email: {  
        type: String,  
        required: true,  
    },  
    phone: {  
        type: String,  
    },  
    farmSize: {  
        type: String,  
    },  
    produceTypes: {  
        type: [String], // Array of strings  
    },  
    supplyFrequency: {  
        type: String,  
    },  
    distributionChannels: {  
        type: [String], // Array of strings  
    },  
    additionalOfferings: {  
        type: String,  
    },  
    mainChallenges: {  
        type: String,  
    },  
    receiveUpdates: {  
        type: Boolean,  
    },  
});  

// Define the schema for the contact form  
const contactSchema = new mongoose.Schema({  
    name: {  
        type: String,  
        required: true,  
    },  
    email: {  
        type: String,  
        required: true,  
    },  
    message: {  
        type: String,  
    },  
});  

// Create Mongoose models  
const Waitlist = mongoose.model("Waitlist", waitlistSchema);  
const ContactForm = mongoose.model("ContactForm", contactSchema);  

// Export the models for use in other parts of the application  
module.exports = {  
    Waitlist,  
    ContactForm,  
};