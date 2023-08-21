import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

import customerRoutes from "./routes/customer.route.js";
import employeeRoutes from "./routes/employee.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/customers", customerRoutes);

app.get("/", (_req, res) => {
  res.json("Wow! I am working!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
