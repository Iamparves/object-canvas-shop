import express from "express";
import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controller/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", addEmployee);
router.delete("/:id", deleteEmployee);
router.put("/:id", updateEmployee);

export default router;
