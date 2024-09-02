import { Permission } from "appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";


export default async function getOrCreateBucket() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Bucket already exists");
    } catch (error) {
        try {
            await storage.createBucket(
                questionAttachmentBucket, 
                questionAttachmentBucket,
                [
                    Permission.create("users"),
                    Permission.delete("users"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.read("any")
                ]);
            console.log("Bucket created successfully");
        } catch (error) {
            console.log(error);
        }
    }
}