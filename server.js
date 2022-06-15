require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const { errorHandler } = require("./middleware/error");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(fileUpload());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/design", require("./routes/design"));



//IMAGE UPLOAD USING EXPRESS-FILEUPLOAD

// Upload Endpoint
app.post("/api/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.name = uuidv4();
  console.log(file.mimetype);
  let fileName = file.name + "." + file.mimetype.split("/")[1];
  console.log(fileName);

  file.mv(`${__dirname}/uploads/${fileName}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: `${fileName}`, filePath: `/uploads/${fileName}` });
  });
});



// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Please set to Productionion"));
}

//Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
