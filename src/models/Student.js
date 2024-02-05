import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cpf: {
    type: String,
    require: true,
  },
  registration: {
    type: Date,
  },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
