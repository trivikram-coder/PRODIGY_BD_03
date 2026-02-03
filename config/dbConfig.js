const dotenv=require("dotenv")
const mongoose=require("mongoose")
dotenv.config()

const db=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(console.log("MongoDb connected successfully🚀🚀🚀"))
    .catch(error=>console.error(error));
}
module.exports=db