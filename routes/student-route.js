const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  updateStudent,
  createStudent,
  getStudent,
  deleteStudent,
} = require("../controllers/student-controller");

router.route("/").get(getAllStudents).post(createStudent);
router
  .route("/:student_id")
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

module.exports = router;
