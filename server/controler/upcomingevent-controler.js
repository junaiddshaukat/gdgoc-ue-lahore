import Upcoming_eventmodel from "../Models/Upcoming_event_model.js";
export const createevent=async(req,res)=>{
    try {

 
       
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