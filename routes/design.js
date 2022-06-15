const express = require("express");
const router = express.Router();
const {
    createDesign,
    getAllDesigns,
    getSingleDesign,
    updateDesign
} = require("../controller/designCtrl");
const { protect } = require("../middleware/auth");


router.post("/", protect, createDesign);
router.get("/", protect, getAllDesigns);
router.get("/:designId", protect, getSingleDesign);
router.put("/edit/:designId", protect, updateDesign);

module.exports = router;