const Organization = require("../models/Organization.js");

class OrganizationController {

    static allOrganizations = async (req, res) => {
        try {
            const listOfAllOrganizations = await Organization.find({});
            if (!listOfAllOrganizations || listOfAllOrganizations.length == 0) {
                return res.status(400).json({ message: "No organizations found!"});
            }

            res.status(200).send({ message: "All organizations fetched successfully!", organizations: listOfAllOrganizations});

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: `Something went wrong! ${error}`});
        }
    }


    static addOrganization = async (req, res) => {
        try {
            
            const {organizationName, organizationEmail, organizationLocation, organizationLogo, organizationWebsite} = req.body;
            if (!organizationName || !organizationEmail || !organizationLocation) {
                return res.status(400).json({ message: "All fields are required!"});
            }

            const existingOrganization = await Organization.findOne({ organizationName: { $regex: new RegExp('^'+organizationName+'$', "i") } });
            if (existingOrganization) {
                return res.status(400).json({ message: 'Organization already exists!' });
            }

            //Create new organization and save it in the DB
            await Organization.create({
                organizationName,
                organizationEmail,
                organizationLocation,
                organizationLogo,
                organizationWebsite,
            });

            res.status(200).send({ message: 'Organization added successfully!' });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: `Something went wrong! ${error}`});
        }
    }


    static getOrganizationById = async (req, res) => {
        try {
            const organizationIsPresent = await Organization.findById(req.params.id);
            if (!organizationIsPresent) {
                return res.status(400).json({ message: 'No organizations found!' });
            }

            res
              .status(200)
              .send({
                message: "Organizations retrieved successfully!",
                organization: organizationIsPresent,
              });

        } catch (error) {
            console.error(error);
            if (error.name === 'CastError') {
              return res.status(400).json({ message: `Invalid ${error.path}: ${error.value}` });
            }
            res.status(500).json({ message: "Something went wrong!" });
          }
    }

}

module.exports = OrganizationController;