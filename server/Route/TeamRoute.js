import express from "express";
const router = express.Router();

import {createmember,getallmembers,deletemember} from "../controler/team-controler.js"


router.post("/createmember",createmember);
router.delete("/deletemember/:id",deletemember);
router.get("/getallmembers",getallmembers);

export { router as teamrouter };
