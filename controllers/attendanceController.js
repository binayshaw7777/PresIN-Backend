const Attendance = require("../models/Attendance.js")
const SORT_BY = "sortBy";
const SORT_ORDER_DESC = "desc";


class AttendanceController {

    static allAttendees = async (req, res) => {
      try {
        const filter = {};
        const sort = {};

        // Extract query parameters and add to filter object
        const queryParams = Object.keys(req.query);
        queryParams.forEach((param) => {
          if (param === SORT_BY) {
            const sortOrder = req.query.sortOrder === SORT_ORDER_DESC ? -1 : 1;
            sort[req.query.sortBy] = sortOrder;
          } else {
            filter[param] = req.query[param];
          }
        });

        //Check if list of all attendees is empty or not
        const listOfAllAttendees = await Attendance.find(filter).sort(sort);
        if (!listOfAllAttendees || listOfAllAttendees.length == 0)
          return res.send({ message: "No attendees found!" });

        res
          .status(200)
          .send({
            message: "All attendees fetched successfully!",
            attendanceList: listOfAllAttendees,
          });

      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ message: `Something went wrong! ${error}` });
      }
    }

    static createAttendance = async (req, res) => {
        try {
            const {
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
            } = req.body;

            if (
              !userID ||
              !name ||
              !markedMinute ||
              !markedHour ||
              !markedDate ||
              !markedMonth ||
              !markedYear ||
              !organization ||
              !location ||
              !faceEmbeddings ||
              !matchPercentage
            ) {
              return res
                .status(400)
                .json({ message: "All fields are required!" });
            }

            const existingAttendance = await Attendance.findOne({
                userID,
                markedDate,
                markedMonth,
                markedYear,
                organization
            });
  
        
            if (existingAttendance) {
                return res.status(400).json({ message: 'Attendance already marked for this date!' });
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
            
            res.status(200).send({ message: 'Attendance marked successfully!' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: `Something went wrong! ${error}`});
        }
    }


    static getAttendanceById = async (req, res) => {
      try {
        const attendanceIsPresent = await Attendance.findById(req.params.id);
        if (!attendanceIsPresent) {
          return res
            .status(404)
            .json({ message: "Attendance not found!" });
        }
        res
          .status(200)
          .send({
            message: "Attendance fetched successfully!",
            data: attendanceIsPresent,
          });
      } catch (error) {
        console.error(error);
        if (error.name === "CastError") {
          return res
            .status(400)
            .json({
              message: `Invalid ${error.path}: ${error.value}`,
            });
        }
        res.status(500).json({ message: "Something went wrong!" });
      }
    }

}

module.exports = AttendanceController;