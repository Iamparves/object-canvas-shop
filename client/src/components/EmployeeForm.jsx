import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, getEmployeeById } from "../utils/apiRequest";

const EmployeeForm = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      if (employeeId) {
        const data = await getEmployeeById(employeeId);
        const { name, email_address, contact_no } = data;

        return { name, email_address, contact_no };
      } else {
        return {};
      }
    },
  });

  const onSubmit = async (data) => {
    if (!employeeId) {
      const result = await addEmployee(data);
      console.log(result);
    }

    navigate("..", { state: { reload: true } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-5 text-lg font-semibold text-dark-800">
          Add new Employee
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
            placeholder="Enter employee name"
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
            placeholder="Enter employee contact no."
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
          <label htmlFor="email" className="text-sm font-medium text-gray-400">
            Email Address
          </label>
          <input
            className="rounded-md border border-dark-800/20 px-4 py-2 text-dark-900 outline-none placeholder:text-gray-300"
            id="email"
            type="text"
            {...register("email_address", {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            })}
            placeholder="Enter employee email"
          />
          {errors.email_address && (
            <p className="text-sm text-red-500">Email address is not valid</p>
          )}
        </div>
        {!employeeId && (
          <div className="mb-5 flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-medium text-gray-400">
              Date of Join
            </label>
            <input
              className="rounded-md border border-dark-800/20 px-4 py-2 text-dark-900 outline-none placeholder:text-gray-300"
              id="date"
              type="date"
              {...register("date_of_joining", { required: true })}
            />
            {errors.date_of_joining && (
              <p className="text-sm text-red-500">Date of join is required</p>
            )}
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="rounded-full bg-primary px-7 py-2 text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
