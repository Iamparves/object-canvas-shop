import { generateUniqueCode } from "./generateUniqueCode";

const baseUri = "https://object-canvas-shop.onrender.com/api/v1";

///////////////
// Employee API
export const getEmployees = async () => {
  const response = await fetch(`${baseUri}/employees`);
  const data = await response.json();
  return data;
};

export const getEmployeeById = async (id) => {
  const response = await fetch(`${baseUri}/employees/${id}`);
  const data = await response.json();
  return data;
};

export const addEmployee = async (newEmployee) => {
  const code = generateUniqueCode();
  const response = await fetch(`${baseUri}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...newEmployee, code }),
  });
  const data = await response.json();
  return data;
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${baseUri}/employees/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const updateEmployee = async (id, updatedEmployee) => {
  const response = await fetch(`${baseUri}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  });
  const data = await response.json();
  return data;
};

///////////////
// Customer API
export const getCustomers = async () => {
  const response = await fetch(`${baseUri}/customers`);
  const data = await response.json();
  return data;
};

export const getCustomerById = async (id) => {
  const response = await fetch(`${baseUri}/customers/${id}`);
  const data = await response.json();
  return data;
};

export const addCustomer = async (newCustomer) => {
  const code = generateUniqueCode();
  const response = await fetch(`${baseUri}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newCustomer,
      code,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteCustomer = async (id) => {
  const response = await fetch(`${baseUri}/customers/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const updateCustomer = async (id, updatedCustomer) => {
  const response = await fetch(`${baseUri}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCustomer),
  });
  const data = await response.json();
  return data;
};
