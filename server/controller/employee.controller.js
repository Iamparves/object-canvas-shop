import db from "../db.js";

export const getEmployees = (_req, res) => {
  const query = "SELECT * FROM employees";

  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getEmployee = (req, res) => {
  const employeeId = req.params.id;
  const query = "SELECT * FROM employees WHERE employee_id = ?";

  db.query(query, [employeeId], (err, data) => {
    if (err) return res.json(err);

    if (!data.length) return res.status(404).json("Employee not found");

    return res.status(200).json(data[0]);
  });
};

export const addEmployee = (req, res) => {
  const query =
    "INSERT INTO employees (`code`,`name`,`contact_no`,`email_address`,`date_of_joining`) VALUES (?)";

  const values = [
    req.body.code,
    req.body.name,
    req.body.contact_no,
    req.body.email_address,
    req.body.date_of_joining,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Employee has been added");
  });
};

export const deleteEmployee = (req, res) => {
  const employeeId = req.params.id;

  const query = "DELETE FROM employees WHERE employee_id = ?";

  db.query(query, [employeeId], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Employee has been deleted");
  });
};

export const updateEmployee = (req, res) => {
  const employeeId = req.params.id;

  const query =
    "UPDATE employees SET `name`=?,`contact_no`=?,`email_address`=? WHERE `employee_id` = ?";

  const values = [
    req.body.name,
    req.body.contact_no,
    req.body.email_address,
    employeeId,
  ];

  db.query(query, [...values], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Employee has been updated");
  });
};
