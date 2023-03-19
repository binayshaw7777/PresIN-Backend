const Attendance = require("../models/Attendance")


class attendanceController {


    static createAttendance = async (req, res) => {
        try {
            const {userID, name, markedMinute, markedHour, markedDate, markedMonth, markedYear, organization, location, mathPercentage} = req.body;

            if (!userID || !name || !markedMinute || !markedHour || !markedDate || !markedMonth || !markedYear || !organization || !location) {
                return res.status(400).send({status: 400, message: "All fields are required!"});
            }

            // Check if attendance already exists for the same date-month-year or not? else create new and update
            const existingAttendance = await Attendance.findOneAndUpdate(
                { userID: userID, markedDate: markedDate, markedMonth: markedMonth, markedYear: markedYear },
                { userID, name, markedMinute, markedHour, markedDate, markedMonth, markedYear,organization, location, mathPercentage },
                { upsert: true, new: true }
              );
            
              if (existingAttendance) {
                return res.status(400).send({ status: 400, message: 'Attendance already marked for this date!' });
              }
            
              res.status(200).send({ status: 200, message: 'Attendance marked successfully!' });
        } catch (error) {
            console.log(error);
            res.status(400).send({ status: 400, message: `Something went wrong! ${error}`});
        }
    }

}

module.exports = attendanceController