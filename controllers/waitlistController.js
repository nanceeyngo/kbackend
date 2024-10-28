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
            fullName,   
            farmName,   
            farmLocation,   
            contactInformation,   
            typeOfProduce,   
            farmSize,   
            supplyFrequency,   
            currentDistributionChannels,   
            mainChallenge,   
            additionalOfferings,   
            referralSource,   
            updateAndNotification   
        } = req.body;  

        // Check if the necessary fields are present  
        if (!fullName || !farmName || !farmLocation ||   
            !contactInformation || !typeOfProduce || !farmSize ||   
            !supplyFrequency || !currentDistributionChannels ||   
            !mainChallenge || !additionalOfferings ||   
            !referralSource) {  
            throw new ErrorResponse("Missing required fields", 400);  
        }  

        // Optional: Additional validation for contactInformation (e.g., email or phone)  
        if (contactInformation.method === 'phone number' && !contactInformation.phoneNumber) {  
            throw new ErrorResponse("Phone number is required when the method is phone number.", 400);  
        }  
        

        // Check if user already exists  
        const userExist = await Waitlist.findOne({ farmName });  
        if (userExist) {  
            throw new ErrorResponse("User already exists!", 400);  
        }  

        // Create new farmer object  
        const newFarmerWaitlist = new Waitlist({  
            fullName,  
            farmName,  
            farmLocation,  
            contactInformation,  
            typeOfProduce,  
            farmSize,  
            supplyFrequency,  
            currentDistributionChannels,  
            mainChallenge,  
            additionalOfferings,  
            referralSource,  
            updateAndNotification  
        });  

        // Save new user, farm, and produce  
        await newFarmerWaitlist.save();  

        
       // Respond with a redirect (if needed) or a message  
       res.status(201).json({ message: "Successfully added to the waitlist! Visit /thankyou for confirmation." });  

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
    getWaitlistPage,  
    farmerWaitlist, 
    getThankYouPage   
}; 





