import mongoose, { Types } from "mongoose";
const Upcoming_eventSchema=mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,

    },
    color:{
        type:String,
        require:true,
    },
    mainpaage_url:{
        type:String,
        require:true,

    }
},{timestamps:true})
const Upcoming_eventmodel=mongoose.model("upcoming_event",Upcoming_eventSchema)
export default Upcoming_eventmodel