const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  markedMinute: {
    type: Number,
    required: true
  },
  markedHour: {
    //This will be in 24 hour format
    type: Number,
    required: true
  },
  markedDate: {
    type: Number,
    required: true
  },
  markedMonth: {
    type: Number,
    required: true
  },
  markedYear: {
    type: Number,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  faceEmbeddings: {
    type: String,
    default: ""
  },
  matchPercentage: {
    type: Number,
    default: 0,
    max: 100
  }
  

});
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;