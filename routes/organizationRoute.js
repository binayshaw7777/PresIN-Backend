const express = require('express')
const router = express.Router()
const organizationController = require('../controllers/organizationController.js')

//Main Routes
router.get('/all', organizationController.allOrganizations)
router.post('/add-organization', organizationController.addOrganization)
router.get("/:id", organizationController.getOrganizationById);

module.exports = router;