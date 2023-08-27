import { generateUniqueCode } from "./generateUniqueCode";

const baseUri = "https://object-canvas-shop.onrender.com/api/v1";

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
