import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//create a method to encrypt the password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
//encrypt password on creating new user or modifying the user profile 
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)
});
const User = mongoose.model("User", userSchema);
export default User;
