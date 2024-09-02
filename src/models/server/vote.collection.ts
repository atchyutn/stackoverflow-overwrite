import { db, commentCollection } from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";
import { votesCollection } from "../name";


export default async function createVotesCollection() {
  // Create votes collection
await databases.createCollection(db, votesCollection, votesCollection, [
  Permission.read("any"),
  Permission.read("users"),
  Permission.write("users"),
  Permission.delete("users"),
  Permission.update("users"),
  Permission.create("users"),
])
  console.log("Votes Collection created successfully");

  // Create attributes
  await Promise.all([
   databases.createEnumAttribute(db, votesCollection, "type", ["question", "answer"], true),
   databases.createEnumAttribute(db, votesCollection, "voteStatus", ["up", "down"], true),
   databases.createStringAttribute(db, votesCollection, "typeId", 50, true),
   databases.createStringAttribute(db, votesCollection, "votedById", 50, true),
  ]);

  console.log("Votes Attributes created successfully");
}
