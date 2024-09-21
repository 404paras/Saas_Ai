import mongoose from "mongoose"
export const connectDB = async(url)=>{
    try{
 await mongoose.connect(url
 )
 console.log("connected to database")
 ;
}
catch{
console.log('Error connecting to database')
}
}