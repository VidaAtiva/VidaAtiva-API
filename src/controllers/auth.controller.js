import "dotenv/config";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  const { cpf, password } = req.body;

  try {
    const user = await User.findOne({ cpf });

    if (!user) {
      return res.status(404).send({ message: "CPF ou Senha incorretos." });
    }

    const ifPasswordIsValid = await bcrypt.compare(password, user.password);

    if (!ifPasswordIsValid) {
      return res.status(404).send({ message: "CPF ou Senha incorretos." });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
      expiresIn: 86400,
    });

    res.send({ token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
