import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: String
  }),
  UserSchema = mongoose.model("User_detail", userSchema);

export default UserSchema;
