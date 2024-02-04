const { StatusCodes } = require("http-status-codes");
const HostelPayment = require("../models/HostelPayment");
const { BadRequestError, NotFoundError } = require("../errors");
const Student = require("../models/Student");

const getAllHostelPayments = async (req, res, next) => {
  const hostelPayment = await HostelPayment.find({});
  res
    .status(StatusCodes.OK)
    .json({ status: true, hostel_payments: hostelPayment });
};

const createHostelPayment = async (req, res, next) => {
  const { total, paid, remaining, startdate, student_id } = req.body;

  if (!total || !paid || !startdate) {
    throw new BadRequestError(
      "please provide required fields total, paid, remaining or date"
    );
  }

  const student = await Student.findById(student_id);
  const createdPayment = await HostelPayment.create({
    total,
    paid,
    remaining,
    startdate,
  });
  console.log(student.hostel_payments);
  try {
    student.hostel_payments.push(createdPayment);
  } catch (error) {
    throw new Error(error);
  }
  await student.save();

  res
    .status(StatusCodes.CREATED)
    .json({ status: true, created_hostel_payment: createdPayment });
};

const getHostelPayment = async (req, res, next) => {
  const payment_id = req.params.hostel_payment_id.slice(1);
  const fetched_payment = await HostelPayment.findById(payment_id);
  if (!fetched_payment) {
    throw new NotFoundError("mess payment not found with id: ", payment_id);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, hostel_payment: fetched_payment });
};

const updateHostelPayment = async (req, res) => {
  const payment_id = req.params.hostel_payment_id.slice(1);
  const updated_hostel_payment = await HostelPayment.findByIdAndUpdate(
    payment_id,
    req.body,
    { new: true }
  );

  if (!updated_hostel_payment) {
    throw new NotFoundError("mess payment not found with id: ", payment_id);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_hostel_payment: updated_hostel_payment });
};

const deleteHostelPayment = async (req, res) => {
  const payment_id = req.params.hostel_payment_id.slice(1);
  const deleted_payment = await HostelPayment.findByIdAndDelete(payment_id);
  if (!deleted_payment) {
    throw new NotFoundError("mess payment not found with id: ", payment_id);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_hostel_payment: deleted_payment });
};

module.exports = {
  getAllHostelPayments,
  deleteHostelPayment,
  createHostelPayment,
  getHostelPayment,
  updateHostelPayment,
};
