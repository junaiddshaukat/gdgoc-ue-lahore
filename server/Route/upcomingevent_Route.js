import express from "express";
const router = express.Router();
import { createevent,getallevent,deletevent } from "../controler/upcomingevent-controler.js";



router.post("/createevent",createevent);
router.get("/getallevent",getallevent);
router.delete("/deletevent/:id",deletevent);

export { router as upcomingeventRouter };
