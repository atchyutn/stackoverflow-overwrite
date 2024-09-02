import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createStorageCollection from "./storage.collection";
import createVotesCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreteDB() {
  try {
    await databases.get(db);
    console.log("Database already exists");
  } catch {
    await databases.create(db, db);
    console.log("Database created successfully");
    try {
      // create collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVotesCollection(),
        createStorageCollection(),
      ]);
      console.log("Collections created successfully");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return databases;
}
