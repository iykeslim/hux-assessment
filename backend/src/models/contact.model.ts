import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
})

export default mongoose.model("Contact", contactSchema)
