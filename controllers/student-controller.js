const { StatusCodes } = require("http-status-codes");
const Student = require("../models/Student");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllStudents = async (req, res, next) => {
  const allStudents = await Student.find({});
  res.status(StatusCodes.OK).json({ status: true, all_students: allStudents });
};

const createStudent = async (req, res) => {
  const { name, cnic, father_name, phone, student_id, floor, room } = req.body;
  if (!name || !father_name || !phone || !student_id || !floor || !room) {
    throw new BadRequestError(
      "please provide name, father_name, phone, student_id, floor or room are required!"
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

const getStudent = async (req, res) => {
  const student_id = req.params.student_id.slice(1);
  const student = await Student.findById(student_id);
  if (!student) {
    throw new NotFoundError("student not found with id: ", student_id);
  }
  res.status(StatusCodes.OK).json({ status: true, student: student });
};

const updateStudent = async (req, res) => {
  const student_id = req.params.student_id.slice(1);
  const updated_student = await Student.findByIdAndUpdate(
    student_id,
    req.body,
    { new: true }
  );

  if (!updated_student) {
    throw new NotFoundError("student not found with id: ", student_id);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_student: updated_student });
};

const deleteStudent = async (req, res) => {
  const student_id = req.params.student_id.slice(1);
  const deleted_student = await Student.findByIdAndDelete(student_id);
  if (!deleted_student) {
    throw new NotFoundError("student not found with id: ", student_id);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_student: deleted_student });
};
module.exports = {
  getAllStudents,
  deleteStudent,
  createStudent,
  updateStudent,
  getStudent,
};
