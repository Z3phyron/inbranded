
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const Schema = mongoose.Schema




const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7h" }
  );
  return token;
};



module.exports = mongoose.model("User", userSchema)

// module.exports = {validate}