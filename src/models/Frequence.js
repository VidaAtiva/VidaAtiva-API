import mongoose, { mongo } from "mongoose";

const frequenceSchema = mongoose.Schema({
  cpf_teacher: {
    type: String,
    require: true,
  },
  cpf_student: {
    type: String,
    require: true,
  },
  class_date: {
    type: Date,
    require: true,
  },
  frequence: {
    type: Boolean,
    default: false,
  },
});

const Frequence = mongoose.model("Frequence", frequenceSchema);

export default Frequence;
