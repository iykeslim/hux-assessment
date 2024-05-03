import express from "express"
import Contact from "../models/contact.model"
import * as Joi from "joi"
import { sendResponse } from "../utils" 

const contactSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  phoneNumber: Joi.string().optional().allow(""), 
})

const router = express.Router()

// Create a new contact - with validation (joi)
router.post("/", async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body)

    if (error) {
      return sendResponse(res, false, error.details[0].message)
    }

    const { firstName, lastName, phoneNumber } = req.body

    const newContact = new Contact({
      firstName,
      lastName,
      phoneNumber,
    })

    const savedContact = await newContact.save()

    sendResponse(res, true, "Contact created successfully", savedContact)
  } catch (error) {
    console.error(error)
    sendResponse(res, false, "Internal server error")
  }
})

// Retrieve a list of all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find()

    sendResponse(res, true, "Contacts retrieved successfully", contacts)
  } catch (error) {
    console.error(error)
    sendResponse(res, false, "Internal server error")
  }
})

// Retrieve a single contact
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const contact = await Contact.findById(id)

    if (!contact) {
      return sendResponse(res, false, "Contact not found")
    }

    sendResponse(res, true, "Contact retrieved successfully", contact)
  } catch (error) {
    console.error(error)
    sendResponse(res, false, "Internal server error")
  }
})

// Update a contact (with validation)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { error } = contactSchema.validate(req.body)

    if (error) {
      return sendResponse(res, false, error.details[0].message)
    }

    const { firstName, lastName, phoneNumber } = req.body

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phoneNumber,
      },
      { new: true },
    ) 

    if (!updatedContact) {
      return sendResponse(res, false, "Contact not found")
    }

    sendResponse(res, true, "Contact updated successfully", updatedContact)
  } catch (error) {
    console.error(error)
    sendResponse(res, false, "Internal server error")
  }
})

// Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const deletedContact = await Contact.findByIdAndDelete(id)

    if (!deletedContact) {
      return sendResponse(res, false, "Contact not found")
    }

    sendResponse(res, true, "Contact deleted successfully")
  } catch (error) {
    console.error(error)
    sendResponse(res, false, "Internal server error")
  }
})

export default router
