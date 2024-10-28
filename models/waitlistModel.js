const mongoose = require("mongoose");  

// Define the schema for the waitlist  
const waitlistSchema = new mongoose.Schema({  
    Name: {  
        type: String,  
        unique: true,  
        required: [true, 'What is your full name?'],  
        trim: true  
    },  
    farmName: {  
        type: String,  
        unique: true,  
        trim: true,  
        required: [true, 'What is the name of your farm?']  
    },  
    
    farmLocation: {  
        type: {  
            city: {  // Changed field to lowercase  
                type: String,  
                required: true   
            },  
            state: {  // Changed field to lowercase  
                type: String,  
                required: true  
            },  
            country: {  // Changed field to lowercase  
                type: String,  
                required: true  
            }  
        },  
        required: [true, 'Where is your farm located?']  // Move 'required' property outside the type definition  
    },  
    
    contactInformation: {  
        method: {  
            type: String,  
            enum: ['email address', 'phone number'],  
            required: [true, 'What is the best way to reach you?']  
        },  
        email: { type: String },  
        phoneNumber: {   
            type: String,  
            validate: {  
                validator: function(v) {  
                    // Validates phone numbers in format (XXX) XXX-XXXX or XXX-XXX-XXXX or XXXXXXXXXX  
                    return /^(1[-\s]?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}|\d{10})$/.test(v);  
                },  
                message: props => `${props.value} is not a valid phone number!`  
            }  
        }  
    },   
    
    typeOfProduce: {  
        type: String,  
        enum: ['leafy greens', 'stretchy vegetables', 'root vegetables', 'fruiting vegetables', 'cruciferous vegetables'],  
        required: [true, 'What type of fruits and vegetables do you grow on your farm?']  
    },   

    farmSize: {  
        type: String,  
        enum: ['1-3 ha', '3-5 ha', '5-8 ha', 'Others'],  
        required: [true, 'What is the approximate size of your farm?']  
    },  
    supplyFrequency: {  
        type: String,  
        enum: ['twice a week', 'once a month', 'others'],  
        required: [true, 'How often do you supply fruits and vegetables to buyers/businesses?']  
    },  
    currentDistributionChannels: {  
        type: String,  
        enum: ['local market', 'wholesalers', 'Direct sales'],  
        required: [true, 'How do you currently distribute your produce?']  
    },  
    mainChallenge: {  
        type: String,  
        required: [true, 'What are the main challenges you face in selling your produce to businesses?']  
    },  
    additionalOfferings: {  
        type: String,  
        enum: ['Organic Certification', 'Value Added Products', 'Farm tours or Educational program', 'Packaging Services'],  
        required: [true, 'Do you offer any additional services or products related to your farm?']  
    },  
    referralSource: {  
        type: String,  
        required: [true, 'How did you hear about Konectar?'],  
        enum: ['linkedin', 'Facebook', 'Instagram ', 'Referral'],  
    },  
    updateAndNotification: {  
        type: Boolean,  
        default: false  // Updated the default format  
    }  
}, {timestamps: true});  

// Create Mongoose models  
const Waitlist = mongoose.model("Waitlist", waitlistSchema);  

// Export the models for use in other parts of the application  
module.exports = {  
    Waitlist  
};