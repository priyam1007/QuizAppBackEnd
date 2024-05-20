import mongoose from "mongoose";

export default async function connect(){
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/quiz-app")
    console.log("Database Connected")
    } catch (error) {
        console.log("DB Error: ",error)
    }
}
