import Team_model from "../Models/Team_model.js"
export const createmember=async(req,res)=>{
    try {
      const { name, position, image, linkedin, github, level } = req.body;
      if (!name || !position || !image || !linkedin || !github || !level) {
        res.status(400);
        throw new Error("Please enter all the information");
      }
 
       
        const newmember = new Team_model(req.body);
        
       
        const savedmember = await newmember.save(); 
        
     
        res.status(200).json({ message: "Success", member: savedmember });
      } catch (error) {
        console.error("Error details:", error); 
        if (error.name === "ValidationError") {
          return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({ message: "Error saving book", error: error.message });
      }

}

export const getallmembers=async (req, res) => {
    try {
    
      const team = await Team_model.find();

      res.status(200).json({
        message: "Team retrieved successfully",
        Team: team
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({
        message: "Error fetching events",
        error: error.message
      });
    }
  };


  
export const deletemember = async (req, res) => {
  try {
    const { id } = req.params; 

    
    const deletedmember = await Team_model.findByIdAndDelete(id);

    if (!deletedmember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully", Member: deletedmember });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error });
  }
};