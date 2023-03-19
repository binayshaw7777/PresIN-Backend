const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendanceController.js')

router.post("/add-attendance", attendanceController.createAttendance)


module.exports = router