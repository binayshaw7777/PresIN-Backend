const mongoose = require("mongoose");


const organizationSchema = new mongoose.Schema({
  
    organizationName: {
        type: String,
        required: true,
    }, 
    organizationEmail: {
        type: String,
        required: true,
    },
    organizationLocation: {
        type: String,
        required: true,
    },
    organizationLogo: {
        type: String,
        default: ""
    },
    organizationWebsite: {
        type: String,
        default: ""
    }

});
const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;