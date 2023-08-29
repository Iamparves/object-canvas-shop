import db from "../db.js";

export const getCustomers = (_req, res) => {
  const query =
    "SELECT customer_id, c.employee_id, c.code, c.name, e.name as employeeName, c.contact_no, opening_due, customer_type FROM employees e JOIN customers c ON e.employee_id = c.employee_id";

  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getCustomer = (req, res) => {
  const customerId = req.params.id;
  const query = "SELECT * FROM customers WHERE customer_id = ?";

  db.query(query, [customerId], (err, data) => {
    if (err) return res.json(err);

    if (!data.length) return res.status(404).json("Customer not found");

    return res.status(200).json(data[0]);
  });
};

export const addCustomer = (req, res) => {
  const query =
    "INSERT INTO customers (`code`,`name`,`contact_no`,`opening_due`,`customer_type`,`employee_id`) VALUES (?)";

  const values = [
    req.body.code,
    req.body.name,
    req.body.contact_no,
    req.body.opening_due,
    req.body.customer_type,
    req.body.employee_id,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Customer has been added");
  });
};

export const deleteCustomer = (req, res) => {
  const customerId = req.params.id;

  const query = "DELETE FROM customers WHERE customer_id = ?";

  db.query(query, [customerId], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Customer has been deleted");
  });
};

export const updateCustomer = (req, res) => {
  const customerId = req.params.id;

  const query =
    "UPDATE customers SET `name`=?,`contact_no`=?,`opening_due`=?,`customer_type`=? WHERE `customer_id` = ?";

  const values = [
    req.body.name,
    req.body.contact_no,
    req.body.opening_due,
    req.body.customer_type,
    customerId,
  ];

  db.query(query, [...values], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Customer has been updated");
  });
};
