import Upcoming_eventmodel from "../Models/Upcoming_event_model.js";
export const createevent=async(req,res)=>{
    try {

      const { title, description, image, color, mainpage_url } = req.body;
      if (!title || !description || !image || !color || !mainpage_url) {
       return res.status(400).json({ message: "Please enter all the information", errors: error.errors })

      }
       
        const newevent = new Upcoming_eventmodel(req.body);
        
       
        const savedevent = await newevent.save(); 
        
     
        res.status(200).json({ message: "Success", event: savedevent });
      } catch (error) {
        console.error("Error details:", error); 
        if (error.name === "ValidationError") {
          return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error saving book", error: error.message });
      }

}

export const getallevent=async (req, res) => {
    try {
    
      const events = await Upcoming_eventmodel.find();

      res.status(200).json({
        message: "events retrieved successfully",
        Events: events
      });
    } catch (error) {
      // Handle any errors during the process
      console.error("Error fetching events:", error);
      res.status(500).json({
        message: "Error fetching events",
        error: error.message
      });
    }
  };
  export const upcoming = async (req, res) => {
    try {
      // Fetch events where type is "upcoming"
      const events = await Upcoming_eventmodel.find({ type: "upcoming" });
  
      res.status(200).json({
        message: "Upcoming events retrieved successfully",
        Events: events,
      });
    } catch (error) {
      // Handle any errors during the process
      console.error("Error fetching events:", error);
      res.status(500).json({
        message: "Error fetching events",
        error: error.message,
      });
    }
  };


  export const pastevents = async (req, res) => {
    try {
      // Fetch events where type is "upcoming"
      const events = await Upcoming_eventmodel.find({ type: "past" });
  
      res.status(200).json({
        message: "Upcoming events retrieved successfully",
        Events: events,
      });
    } catch (error) {
      // Handle any errors during the process
      console.error("Error fetching events:", error);
      res.status(500).json({
        message: "Error fetching events",
        error: error.message,
      });
    }
  };
  
  export const deletevent = async (req, res) => {
    try {
      const { id } = req.params; 
  
      
      const deletedevent = await Upcoming_eventmodel.findByIdAndDelete(id);
  
      if (!deletedevent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event deleted successfully", Event: deletedevent });
    } catch (error) {
      res.status(500).json({ message: "Error deleting Event", error });
    }
  };


  export const updateevent =async (req, res) => {
    try {
      const { id } = req.params; 
      const { title, description, image, color, mainpage_url } = req.body;
  if (!title || !description || !image || !color || !mainpage_url) {
    res.status(400);
    throw new Error("Please enter all the information");
  }
  
      
      const deletedevent = await Upcoming_eventmodel.findOneAndUpdate(
        { _id: id }, // Assuming the document is identified by _id
        req.body,
        { new: true }
      );
  
      if (!deletedevent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event Edit successfully", Event: deletedevent });
    } catch (error) {
      res.status(500).json({ message: "Error Edit Event", error });
    }
  };


  export const getoneevent=async (req, res) => {
    try {
      const { id } = req.params; 
    
      const event = await Upcoming_eventmodel.findById({_id:id});

      res.status(200).json({
        message: "events retrieved successfully",
        Event: event 
      });
    } catch (error) {
      // Handle any errors during the process
      console.error("Error fetching events:", error);
      res.status(500).json({
        message: "Error fetching events",
        error: error.message
      });
    }
  };