// Import necessary modules and models  
const {Waitlist} = require("../models/waitlistModel");   

const ErrorResponse = require('../utils/ErrorResponse'); // Import error response   
 
const config = require("../config");  // Assuming you have a configuration file for constants  



// controllers/HomeController.js  
const getHomePage = (req, res) => {  
    res.json({  
        message: "Welcome to Konectar",  
        info: "Join the waitlist to be the first to be updated"  
    });  
};  


// Post a new entry to the waitlist page  
const farmerWaitlist = async (req, res, next) => {  
    try {  
        // Destructure the request body  
        const {   
            username,   
            farmname,   
            farmlocation,  
            contactinformation,    
            farmsize,
            typeofproduce,     
            supplyfrequency,   
            distributionchannels,  
            additionalofferings, 
            referralsource, 
            mainchallenges,     
            receiveupdates  
        } = req.body;  

        // Check if the necessary fields are present  
        if (!username || !farmname || !farmlocation ||   
            !contactinformation || !farmsize || !typeofproduce ||   
            !supplyfrequency || !distributionchannels ||   
            !additionalofferings || !referralsource || !mainchallenges) {  
            throw new ErrorResponse("Missing required fields", 400);  
        }  

        // Optional: Additional validation for contactInformation (e.g., email or phone)  
        if (contactinformation.type === 'phone number' && !contactinformation.phoneno) {  
            throw new ErrorResponse("Phone number is required when the method is phone number.", 400);  
        }  
        

        // Check if user already exists  
        const userExist = await Waitlist.findOne({ farmname });
        if (userExist) {  
            throw new ErrorResponse("User already exists!", 400);  
        }  

        // Create new farmer object  
        const newFarmerWaitlist = new Waitlist({  
            username,   
            farmname,   
            farmlocation,  
            contactinformation,    
            farmsize,
            typeofproduce,     
            supplyfrequency,   
            distributionchannels,  
            additionalofferings, 
            referralsource, 
            mainchallenges,     
            receiveupdates 
        });  

        // Save new user, farm, and produce  
        await newFarmerWaitlist.save();  

        
       // Respond with a redirect (if needed) or a message  
       res.status(201).json({  message: "Thank you for joining the waitlist",  
                               redirectLink: process.env.COMMUNITY_LINK
        });  

    } catch (error) {  
        console.error("Error registering new user:", error.message);  

        // Handle duplicate key error for PostgreSQL  
        if (error.code === '23505') {  
            throw new ErrorResponse("Duplicate key value entered.", 400);  
        }  

        // Let the global error handler handle other errors  
        next(error);  
    }  
};  

// controllers/thankYouController.js  
const getThankYouPage = (req, res) => {  
    res.json({  
        message: "Thank you for joining the waitlist",  
        redirectLink: process.env.COMMUNITY_LINK
    
    });  
};  
module.exports = {  
    getHomePage,  
    farmerWaitlist, 
    getThankYouPage   
};





