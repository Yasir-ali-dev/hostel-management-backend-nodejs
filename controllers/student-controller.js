const { StatusCodes } = require("http-status-codes");
const Student = require("../models/Student");
const { BadRequestError } = require("../errors");

const getAllStudents = async (req, res, next) => {
  const allStudents = await Student.find({});
  res.status(StatusCodes.OK).json({ status: true, all_students: allStudents });
};

const createStudent = async (req, res, next) => {
  const { name, father_name, cnic, phone, student_id, floor, room } = req.body;
  if (
    !name ||
    !father_name ||
    !cnic ||
    !phone ||
    !student_id ||
    !floor ||
    !room
  ) {
    throw new BadRequestError(
      "please provide name, father_name, cnic, phone, student_id, floor or room are required!"
    );
  }
  const newStudent = await Student.create({
    name,
    father_name,
    cnic,
    phone,
    student_id,
    floor,
    room,
    check_in_date: new Date(),
  });
  res.status(StatusCodes.CREATED).json({ status: true, student: newStudent });
};

module.exports = {
  getAllStudents,
  createStudent,
};
