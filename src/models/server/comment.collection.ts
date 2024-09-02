import { IndexType } from "node-appwrite";

import { db, commentCollection } from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";

export default async function createCommentCollection() {
  // create collection
  await databases.createCollection(db, commentCollection, commentCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.delete("users"),
    Permission.update("users"),
  ]);

  console.log("Comments Collection created successfully");

  // creating attributes
  await Promise.all([
    databases.createStringAttribute(db, commentCollection, "content", 10000, true),
    databases.createStringAttribute(db, commentCollection, "authorId", 50, true),
    databases.createEnumAttribute(db, commentCollection, "type", ["question", "answer"], true),
    databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
  ]);

  console.log("Comments Attributes created successfully");
}