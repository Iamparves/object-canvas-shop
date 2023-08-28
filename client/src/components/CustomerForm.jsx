import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCustomer,
  getCustomerById,
  getEmployees,
  updateCustomer,
} from "../utils/apiRequest";

const CustomerForm = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [isEmployeeFetching, setIsEmployeeFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const isDisabled =
    isLoading || (employees.length === 0 && !isEmployeeFetching);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      if (customerId) {
        setIsLoading(true);
        const data = await getCustomerById(customerId);
        const { name, contact_no, opening_due, customer_type } = data;
        setIsLoading(false);

        return { name, contact_no, opening_due, customer_type };
      } else {
        return {};
      }
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (!customerId) {
      const newCustomer = {
        ...data,
        opening_due: data.opening_due || 0,
        employee_id: Number(data.employee_id),
      };

      const result = await addCustomer(newCustomer);
    } else {
      const result = await updateCustomer(customerId, data);
    }

    navigate("..", { state: { reload: true } });
  };

  useEffect(() => {
    const loadAllEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }

      setIsEmployeeFetching(false);
    };

    loadAllEmployees();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {employees.length === 0 && !isEmployeeFetching && (
          <p className="mb-2 rounded-md bg-red-100 p-3 text-center text-[15px] font-medium leading-tight text-red-500">
            You must have at least one employee before you can add a customer
          </p>
        )}

        <h3 className="mb-5 text-lg font-semibold text-dark-800">
          {customerId ? "Edit Existing Customer" : "Add new Customer"}
        </h3>

        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-400">
            Name
          </label>
          <input
            className="rounded-md border border-dark-800/20 px-4 py-2 text-dark-900 outline-none placeholder:text-gray-300"
            id="name"
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter customer name"
            disabled={isDisabled}
          />
          {errors.name && (
            <p className="text-sm text-red-500">Name is required</p>
          )}
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <label
            htmlFor="contact"
            className="text-sm font-medium text-gray-400"
          >
            Contact No.
          </label>
          <input
            className="rounded-md border border-dark-800/20 px-4 py-2 text-dark-900 outline-none placeholder:text-gray-300"
            id="contact"
            type="tel"
            {...register("contact_no", {
              required: true,
              minLength: 11,
              maxLength: 11,
            })}
            placeholder="Enter customer contact no."
            disabled={isDisabled}
          />
          {errors.contact_no?.type === "required" && (
            <p className="text-sm text-red-500">Contact no. is required</p>
          )}
          {(errors.contact_no?.type === "maxLength" ||
            errors.contact_no?.type === "minLength") && (
            <p className="text-sm text-red-500">
              Contact no. should be 11 characters long
            </p>
          )}
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <label
            htmlFor="openingDue"
            className="text-sm font-medium text-gray-400"
          >
            Opening Due
          </label>
          <input
            className="rounded-md border border-dark-800/20 px-4 py-2 text-dark-900 outline-none placeholder:text-gray-300"
            id="openingDue"
            type="text"
            {...register("opening_due", { min: 0 })}
            placeholder="Enter customer due (if any)"
            disabled={isDisabled}
          />
          {errors.opening_due?.type === "min" && (
            <p className="text-sm text-red-500">
              Opening due can't be less than 0
            </p>
          )}
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <label
            htmlFor="customerType"
            className="text-sm font-medium text-gray-400"
          >
            Customer Type
          </label>
          <select
            id="customerType"
            {...register("customer_type")}
            className="rounded-md border border-dark-800/20 px-4 py-2 text-dark-900 outline-none"
            disabled={isDisabled}
          >
            <option value="Retail">Retail</option>
            <option value="Dealer">Dealer</option>
            <option value="Hire">Hire</option>
          </select>
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <label
            htmlFor="associatedEmployee"
            className="text-sm font-medium text-gray-400"
          >
            Associated Employee
          </label>
          <select
            id="associatedEmployee"
            {...register("employee_id")}
            className="rounded-md border border-dark-800/20 px-4 py-2 text-dark-900 outline-none"
            disabled={isDisabled}
          >
            {employees?.map((employee) => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            className="rounded-full bg-primary px-7 py-2 text-white disabled:opacity-50"
            type="submit"
            disabled={isDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
