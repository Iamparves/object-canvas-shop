import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import EmployeeRow from "../components/EmployeeRow";
import { deleteEmployee, getEmployees } from "../utils/apiRequest";

const Employee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { pathname, state } = useLocation();

  const loadAllEmployees = async () => {
    setIsLoading(true);
    setEmployees([]);

    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const onDeleteEmployee = async (employeeId, employeeName) => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure to delete employee "${employeeName}"?`,
      );

      if (confirmDelete) {
        await deleteEmployee(employeeId);
        loadAllEmployees();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllEmployees();
  }, []);

  useEffect(() => {
    if (pathname === "/employee" && state?.reload) {
      loadAllEmployees();
    }
  }, [pathname]);

  return (
    <main>
      <Outlet />
      <section className="min-h-[calc(100vh-64px)] py-10">
        <div className="container">
          {/* Top */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark-800 sm:text-2xl">
              Employee List
            </h2>
            <Link
              to="add"
              className={`rounded-full bg-primary px-5 py-3 text-sm font-medium text-white sm:text-base ${
                isLoading
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Add Employee
            </Link>
          </div>
          {/* Table */}
          <div className="mt-5 overflow-x-auto rounded-md bg-white shadow-sm">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Contact No.</th>
                  <th>Email Address</th>
                  <th>Date of Join</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 &&
                  employees.map((employee, index) => (
                    <EmployeeRow
                      key={employee.employee_id}
                      index={index + 1}
                      employee={employee}
                      onDeleteEmployee={onDeleteEmployee}
                    />
                  ))}
              </tbody>
            </table>
            {isLoading && (
              <div className="flex justify-center py-10">
                <span className="loading loading-ring loading-lg bg-primary"></span>
              </div>
            )}
            {!isLoading && employees.length === 0 && (
              <div className="flex justify-center px-3 py-10">
                <p className="text-center text-gray-400">
                  There are no employees in the database. try adding some
                </p>
              </div>
            )}
          </div>
          {/* Table End */}
        </div>
      </section>
    </main>
  );
};

export default Employee;
