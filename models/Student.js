const { default: mongoose } = require("mongoose");
const HostelPayment = require("./HostelPayment");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [5, "Enter Fullname is required"],
  },
  father_name: {
    type: String,
    required: [true, "Father Name is required"],
    minLength: [5, "Enter Fullname is required"],
  },
  cnic: {
    type: String,
    required: [true, "CNIC is required"],
    minLength: [13, "Enter Fullname is required"],
    maxLength: [13, "Enter Fullname is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
    minLength: [11, "phone no is required"],
    maxLength: [11, "phone no is required"],
    unique: true,
  },
  student_id: {
    type: String,
  },
  check_in_date: {
    type: Date,
  },
  floor: {
    type: Number,
    required: [true, "Floor is required"],
  },
  room: {
    type: Number,
    required: [true, "Room is required"],
  },
  hostel_payments: ["HostelPayment"],
  mess_payments: ["MessPayment"],
});
module.exports = mongoose.model("Student", studentSchema);
