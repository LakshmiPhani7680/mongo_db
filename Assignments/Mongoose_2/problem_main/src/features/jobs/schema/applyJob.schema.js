// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
// jobId (ObjectID reference to 'Job', mandatory): Store the job the applicant is applying for.

// userId (ObjectID reference to 'User', mandatory): Identify the applicant.
export const applyJobSchema = new mongoose.Schema({
  // Write your code here
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
