const request = require("supertest");
const app = require("../app"); 
const Contact = require("../models/contact.model"); 

describe("Contact API Endpoints", () => {
  // Helper function to create a new contact in the database
  const createContact = async (data) => {
    const newContact = new Contact(data)
    await newContact.save()
    return newContact
  }

  beforeEach(async () => {
    // Clear the database before each test (optional, adjust as needed)
    await Contact.deleteMany({})
  })

  // Test Case: Create Contact (Success)
  it("should create a new contact", async () => {
    const newContact = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
    }

    const res = await request(app)
      .post("/api/contacts")
      .send(newContact)
      .expect(201) // Expect status code 201 (Created)

    expect(res.body).toHaveProperty("success", true)
    expect(res.body).toHaveProperty("message")
    expect(res.body).toHaveProperty("data")
    expect(res.body.data).toMatchObject(newContact) // Compare properties (ignoring _id)
  })

  // Test Case: Create Contact (Validation Error)
  it("should return an error for invalid contact data", async () => {
    const invalidData = { lastName: "Doe" } // Missing required firstName

    const res = await request(app)
      .post("/api/contacts")
      .send(invalidData)
      .expect(400) // Expect status code 400 (Bad Request)

    expect(res.body).toHaveProperty("success", false)
    expect(res.body).toHaveProperty("message")
  })

  // Test Case: Update Contact (Success)
  it("should update an existing contact", async () => {
    const existingContact = await createContact({
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "",
    })

    const updateData = {
      firstName: "Jane",
      lastName: "Updated Smith",
      phoneNumber: "555-555-5555",
    }

    const res = await request(app)
      .put(`/api/contacts/${existingContact._id}`)
      .send(updateData)
      .expect(200) // Expect status code 200 (OK)

    expect(res.body).toHaveProperty("success", true)
    expect(res.body).toHaveProperty("message")
    expect(res.body.data).toMatchObject(updateData) // Compare updated properties

    // Verify actual update in database (optional)
    const updatedContact = await Contact.findById(existingContact._id)
    expect(updatedContact.lastName).toEqual(updateData.lastName)
    expect(updatedContact.phoneNumber).toEqual(updateData.phoneNumber)
  })

  // Test Case: Update Contact (Validation Error)
  it("should return an error for invalid update data", async () => {
    const existingContact = await createContact({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
    })

    const invalidData = { phoneNumber: "invalid number" } // Invalid phone number format

    const res = await request(app)
      .put(`/api/contacts/${existingContact._id}`)
      .send(invalidData)
      .expect(400) // Expect status code 400 (Bad Request)

    expect(res.body).toHaveProperty("success", false)
    expect(res.body).toHaveProperty("message")
  })

  // Test Case: Update Contact (Non-existent ID)
  it("should return an error for non-existent contact ID", async () => {
    const nonExistentId = "invalid-id" // Invalid or non-existent ID

    const updateData = {
      firstName: "Updated Name",
    }

    const res = await request(app)
      .put(`/api/contacts/${nonExistentId}`)
      .send(updateData)
      .expect(404) // Expect status code 404 (Not Found)

    expect(res.body).toHaveProperty("success", false)
    expect(res.body).toHaveProperty("message")
  })
})

