const { StatusCodes } = require("http-status-codes");
const MessPayment = require("../models/MessPayment");
const { BadRequestError, NotFoundError } = require("../errors");
const Student = require("../models/Student");

const getAllMessPayments = async (req, res, next) => {
  const messPayment = await MessPayment.find({});
  res.status(StatusCodes.OK).json({ status: true, mess_payments: messPayment });
};

const createMessPayment = async (req, res, next) => {
  const { total, paid, remaining, startdate, student_id } = req.body;

  if (!total || !paid || !startdate) {
    throw new BadRequestError(
      "please provide required fields total, paid, remaining or date"
    );
  }

  const createdPayment = await MessPayment.create({
    total,
    paid,
    remaining,
    startdate,
  });

  const student = await Student.findById(student_id);
  try {
    student.mess_payments.push(createdPayment);
  } catch (error) {
    throw new Error(error);
  }
  await student.save();

  res
    .status(StatusCodes.CREATED)
    .json({ status: true, created_mess_payment: createdPayment });
};

const getMessPayment = async (req, res, next) => {
  const payment_id = req.params.mess_payment_id.slice(1);
  const fetched_payment = await MessPayment.findById(payment_id);
  if (!fetched_payment) {
    throw new NotFoundError("mess payment not found with id: ", payment_id);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, mess_payment: fetched_payment });
};

const updateMessPayment = async (req, res) => {
  const payment_id = req.params.mess_payment_id.slice(1);
  const updated_mess_payment = await MessPayment.findByIdAndUpdate(
    payment_id,
    req.body,
    { new: true }
  );
  if (!updateMessPayment) {
    throw new NotFoundError("mess payment not found with id: ", payment_id);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_mess_payment: updated_mess_payment });
};

const deleteMessPayment = async (req, res) => {
  const payment_id = req.params.mess_payment_id.slice(1);
  const deleted_payment = await MessPayment.findByIdAndDelete(payment_id);
  if (!deleted_payment) {
    throw new NotFoundError("mess payment not found with id: ", payment_id);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_mess_payment: deleted_payment });
};

module.exports = {
  getAllMessPayments,
  deleteMessPayment,
  createMessPayment,
  getMessPayment,
  updateMessPayment,
};
