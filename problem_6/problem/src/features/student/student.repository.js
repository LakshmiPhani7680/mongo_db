// Please don't change the pre-written code
// Import the necessary modules here

import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";

const collectionName = "students";

class studentRepository {
  async addStudent(studentData) {
    const db = getDB();
    await db.collection(collectionName).insertOne(studentData);
  }

  async getAllStudents() {
    const db = getDB();
    const students = await db.collection(collectionName).find({}).toArray();
    return students;
  }

  //You need to implement methods below:
  // Start Writing your code
  async createIndexes() {
    try {
      const db = getDB();
      await db.collection(collectionName).createIndex({ name: 1 });
      await db.collection(collectionName).createIndex({ age: 1, grade: -1 });
      console.log("Indexes created successfully");
    } catch (error) {
      console.error("Error creating indexes:", error);
    }
  }

  async getStudentsWithAverageScore() {
    try {
      const db = getDB();
      const students = await db
        .collection(collectionName)
        .aggregate([
          { $unwind: "$scores" },
          {
            $group: {
              _id: "$_id",
              name: "$name",
              averageScore: { $avg: "$scores" },
            },
          },
        ])
        .toArray();
      return students;
    } catch (error) {
      console.error("Error retrieving students with average score:", error);
    }
  }

  async getQualifiedStudentsCount() {
    try {
      const db = getDB();
      const count = await db.collection(collectionName).countDocuments({
        age: { $gt: 9 },
        grade: { $lte: "B" },
        assignment: "math",
        score: { $gte: 60 },
      });
      return count;
    } catch (error) {
      console.error("Error counting qualified students:", error);
    }
  }

  async updateStudentGrade(studentId, extraCreditPoints) {
    const client = getClient();
    const session = client.startSession();
    try {
      session.startTransaction();
      const db = getDB();
      db.students.updateOne(
        { _id: studentId, "assignments.name": "math" },
        {
          $inc: { "assignments.$.score": extraCreditPoints },
        },
        { session }
      );
      const student = await db
        .collection(collectionName)
        .findOne({ _id: new ObjectId(studentId) }, { session });
      const totalScore = student.assignments.reduce(
        (acc, assignment) => acc + assignment.score,
        0
      );
      const averageScore = totalScore / student.assignments.length;
      let newGrade;
      if (averageScore >= 90) newGrade = "A";
      else if (averageScore >= 80) newGrade = "B";
      else if (averageScore >= 70) newGrade = "C";
      else if (averageScore >= 60) newGrade = "D";
      else newGrade = "F";
      await db
        .collection(collectionName)
        .updateOne(
          { _id: new ObjectId(studentId) },
          { $set: { grade: newGrade } },
          { session }
        );
      await session.commitTransaction();
    } catch (error) {
      console.error("Error updating student grades:", error);
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default studentRepository;
