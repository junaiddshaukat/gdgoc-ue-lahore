import express from "express";
const router = express.Router();
import { createevent,getallevent,deletevent,updateevent ,upcoming} from "../controler/upcomingevent-controler.js";



router.post("/createevent",createevent);
router.get("/getupcomingevents",upcoming);
router.get("/getallevent",getallevent);
router.delete("/deletevent/:id",deletevent);
router.put("/updateevent/:id",updateevent);

export { router as upcomingeventRouter };
