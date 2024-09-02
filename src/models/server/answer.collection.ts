import { IndexType } from "node-appwrite";

import { db, answerCollection } from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";

export default async function createAnswerCollection() {
  // create collection
  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.delete("users"),
    Permission.update("users"),
  ]);

  console.log("Answers Collection created successfully");

  // creating attributes
  await Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
        db,
        answerCollection, 
        "authorId",
        50,
        true
    ),
    databases.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      50,
      true
    ),
  ]);

  console.log("Answers Attributes created successfully");
}
