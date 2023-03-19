const Attendance = require("../models/Attendance.js")
const SORT_BY = "sortBy";
const SORT_ORDER_DESC = "desc";


class AttendanceController {

    static createAttendance = async (req, res) => {
        try {
            const {userID, name, markedMinute, markedHour, markedDate, markedMonth, markedYear, organization, location, faceEmbeddings, matchPercentage} = req.body;

            if (!userID || !name || !markedMinute || !markedHour || !markedDate || !markedMonth || !markedYear || !organization || !location || !faceEmbeddings || !matchPercentage) {
                return res.status(400).send({status: 400, message: "All fields are required!"});
            }

            const existingAttendance = await Attendance.findOne({
                userID,
                markedDate,
                markedMonth,
                markedYear,
                organization
            });
  
        
            if (existingAttendance) {
                return res.status(400).send({ status: 400, message: 'Attendance already marked for this date!' });
            }

            //Create new attendance and save it in the DB
            await Attendance.create({
                userID,
                name,
                markedMinute,
                markedHour,
                markedDate,
                markedMonth,
                markedYear,
                organization,
                location,
                faceEmbeddings,
                matchPercentage,
            });
            
            res.status(200).send({ status: 200, message: 'Attendance marked successfully!' });
        } catch (error) {
            console.log(error);
            res.status(400).send({ status: 400, message: `Something went wrong! ${error}`});
        }
    }

}

module.exports = AttendanceController;