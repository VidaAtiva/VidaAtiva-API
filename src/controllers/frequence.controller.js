import Frequence from "../models/Frequence.js";
import User from "../models/User.js";
import Student from "../models/Student.js";
import moment from "moment";

export const findAllFrequencesByDateController = async (req, res) => {
  const { class_date } = req.query;
  let infoFrequence = [];

  try {
    const frequences = await Frequence.find({ class_date });

    if (frequences.length === 0) {
      return res
        .status(200)
        .send({ message: "Não existe nenhuma frequência nessa data." });
    } else {
      await Promise.all(
        frequences.map(async (frequence) => {
          const currentStudent = await Student.findOne({
            cpf: frequence.cpf_student,
          });

          const currentFrequence = {
            name: currentStudent.name,
            cpf: currentStudent.cpf,
            registration: currentStudent.registration,
            frequence: frequence.frequence,
            class_date: frequence.class_date,
          };

          infoFrequence.push(currentFrequence);
        })
      );
    }

    return res.status(200).json({ infoFrequence });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const addFrequencesController = async (req, res) => {
  const userId = req.userId;
  const frequences = req.body;

  const teacher = await User.findById(userId);
  const cpf_teacher = teacher.cpf;

  try {
    for (let i = 0; i < frequences.length; i++) {
      const { cpf_student, class_date, frequence } = frequences[i];

      const newFrequence = new Frequence({
        cpf_teacher,
        cpf_student,
        class_date,
        frequence,
      });

      await newFrequence.save();
    }

    const allFrequences = await Frequence.find().select(
      "cpf_teacher cpf_student class_date frequence -_id"
    );

    return res.status(200).send({ allFrequences });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const allFrequencesOnTheMonth = async (req, res) => {
  try {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    const frequencesTrue = await Frequence.countDocuments({
      class_date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
      frequence: true,
    });

    const frequencesFalse = await Frequence.countDocuments({
      class_date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
      frequence: false,
    });

    res.status(200).send({ frequencesTrue, frequencesFalse });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const allFrequencesOnTheWeek = async (req, res) => {
  try {
    const startOfWeek = moment().startOf("week").utc();
    const frequencesByDay = {};

    for (let i = 0; i < 7; i++) {
      const dayStart = startOfWeek
        .clone()
        .add(i, "days")
        .startOf("day")
        .toDate();
      const dayEnd = startOfWeek.clone().add(i, "days").endOf("day").toDate();

      const frequencesTrue = await Frequence.countDocuments({
        class_date: {
          $gte: dayStart,
          $lte: dayEnd,
        },
        frequence: true,
      });

      const frequencesFalse = await Frequence.countDocuments({
        class_date: {
          $gte: dayStart,
          $lte: dayEnd,
        },
        frequence: false,
      });

      frequencesByDay[startOfWeek.clone().add(i, "days").format("dddd")] = {
        frequencesTrue,
        frequencesFalse,
      };
    }

    res.status(200).send(frequencesByDay);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
