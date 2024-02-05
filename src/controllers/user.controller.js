import "dotenv/config";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const CreateUserController = async (req, res) => {
  const { name, cpf, password } = req.body;

  try {
    if (!name || !cpf || !password) {
      res.send("Preencha todos os campos");
    }

    const user = new User({
      name,
      cpf,
      password,
    });

    await user.save();

    res.send({message: "Usuário criado com sucesso"});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const ChangeUserPasswordController = async (req, res) => {
  const { current_password, new_password } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!bcrypt.compareSync(current_password, user.password)) {
      res.status(403).send({ message: "Senha atual incorreta." });
    }

    user.password = new_password;
    await user.save();
    return res.status(200).send("Senha atualizada com sucesso.");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const findAllUsersController = async (req, res) => {
  let users = [];
  try {
    const usersFindAll = await User.find();

    users.push(
      usersFindAll.map((user) => {
        const userActual = {
          name: user.name,
          cpf: user.cpf,
          add_student: user.add_student,
          add_teacher: user.add_teacher,
        };
        return userActual;
      })
    );

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateAllUsersController = async (req, res) => {
  const teachers = req.body

  try {
    for(let i = 0; i < teachers.length; i++){
      const { cpf, add_student, add_teacher } = teachers[i];

      await User.findOneAndUpdate({ cpf }, { add_student, add_teacher})
    }

    return res
      .status(200)
      .send({ message: "Autorizações atualizadas com sucesso." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const FindUserByIdController = async (req, res) => {
  const userId = req.userId;

  try {
    const userFindid = await User.findById(userId);

    const user = {
      name: userFindid.name,
      add_student: userFindid.add_student,
      add_teacher: userFindid.add_teacher,
    };

    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
