import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cpf: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  add_student: {
    type: Boolean,
    default: false,
  },
  add_teacher: {
    type: Boolean,
    default: false,
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.password) {
    throw new Error("Password not provided");
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
