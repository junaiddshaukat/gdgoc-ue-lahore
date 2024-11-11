import mongoose, { Types } from "mongoose";
const Team_Schema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    position:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,

    },
    linkedin:{
        type:String,
        require:true,
    },
    github:{
        type:String,
        require:true,
    },
    level:{
        type:Number,
        require:true,
    }
},{timestamps:true})
const Team_model=mongoose.model("team",Team_Schema)
export default Team_model