// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
// title (string, mandatory): This field should store the job title.

// description (string, mandatory): This field is for the job description.

// company (string, mandatory): Use this field to store the name of the company posting the job.

// salary (number, mandatory): Store the job's salary in this field.

// applicants (ObjectID reference to 'User', mandatory): This field links to applicants as references in the 'User' collection.
export const jobSchema = new mongoose.Schema({
  // Write your code here
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  salary: { type: Number, required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
