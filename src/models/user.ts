import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Number is required"],
  },
});

const User = models.user || model("user", userSchema);

export default User;
