const Design = require("../model/design");
const asyncHandler = require("express-async-handler");
const base64ToImage = require("base64-to-image");
const { v4: uuidv4 } = require("uuid");

// @desc    Register new user
// @route   POST /api/auth
// @access  Public
const createDesign = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  console.log(req.files);

  try {
    //file upload to localstorage
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;

    file.name = uuidv4();
    console.log(file.mimetype);
    let fileName = file.name + "." + file.mimetype.split("/")[1];
    console.log(fileName);

    file.mv(`${__dirname}/../uploads/${fileName}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      // res.json({ fileName: `${fileName}`, filePath: `/uploads/${fileName}` });
    });
    const host = req.hostname;
    const filePath = req.protocol + "://" + host + ":5000/uploads/" + fileName;
    const design = await Design.create({ userId, image: filePath });
    res.status(201).json({ design });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const getAllDesigns = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let designs;
  try {
    designs = await Design.find({ userId });
    console.log(designs);
    res.status(201).json(designs);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const getSingleDesign = asyncHandler(async (req, res) => {

  const {designId} = req.params
  let design;
  try {
    design = await Design.findById(designId);
    console.log(design);
    res.status(201).json(design);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});


const updateDesign = asyncHandler(async (req, res) => {

  const { designId } = req.params
  console.log(req.files)
  let design;
  try {
    //file upload to localstorage
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;

    file.name = uuidv4();
    console.log(file.mimetype);
    let fileName = file.name + "." + file.mimetype.split("/")[1];
    console.log(fileName);

    file.mv(`${__dirname}/../uploads/${fileName}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      // res.json({ fileName: `${fileName}`, filePath: `/uploads/${fileName}` });
    });
    const host = req.hostname;
    const filePath = req.protocol + "://" + host + ":5000/uploads/" + fileName;


    design = await Design.findByIdAndUpdate(
      designId,
      { image: filePath },
      { new: true }
    );
    console.log(design);
    res.status(201).json(design);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});



module.exports = {
  createDesign,
  getAllDesigns,
  getSingleDesign,
  updateDesign
};
