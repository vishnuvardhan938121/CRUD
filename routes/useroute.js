const usercontroller= require("../controller/usercontroller.js") 
const express= require("express") 
const router= express.Router();

router.post("/create",usercontroller.createuser)   
router.get("/getallusers",usercontroller.getallusers) 
router.put("/updateuserput/:id",usercontroller.Updateuserput)
router.patch("/userupdatepatch/:id",usercontroller.Updateuserpatch) 
router.delete("/delete/:id",usercontroller.deleteuser)
module.exports= router