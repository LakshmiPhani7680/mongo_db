// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { applyJobSchema } from "./schema/applyJob.schema.js";
import { jobSchema } from "./schema/newJob.schema.js";

const applyJobModel = mongoose.model("ApplyJob", applyJobSchema);
const newJobModel = mongoose.model("Job", jobSchema);

export const createNewJob = async (job) => {
  // Write your code here
  const newJob = new newJobModel(job);
  return await newJob.save();
};

export const applyJobRepo = async (jobId, userId) => {
  // Write your code here
  const existingApplication = await applyJobModel.findOne({ jobId, userId });
  if (existingApplication) {
    return null; // User has already applied for this job
  }
  const newApplication = new applyJobModel({ jobId, userId });
  const savedNewApplication = await newApplication.save();
  const updatedJobDoc = await newJobModel.findByIdAndUpdate(
    jobId,
    { $push: { applicants: userId } },
    { new: true }
  );
  return updatedJobDoc;
};
export const findJobRepo = async (_id) => {
  // Write your code here
  return await newJobModel.findById(_id);
};
