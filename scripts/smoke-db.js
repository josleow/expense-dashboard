require("dotenv").config({path: "../.env.local"})
const mongoose = require("mongoose")

async function main(){
    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI missing in .env.local")
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB") 

    const cols=await mongoose.connection.db.listCollections().toArray()
    console.log("Collections in the database:", cols.map(col => col.name).join(", "))

    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
}

main().catch(err => {
    console.error("❌ Smoke test failed:", err)
    process.exit(1)
})