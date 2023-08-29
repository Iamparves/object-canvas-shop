import { format } from "date-fns";
import React from "react";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const EmployeeRow = ({ employee, index, onDeleteEmployee }) => {
  const { employee_id, name, contact_no, email_address, date_of_joining } =
    employee;
  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
      <td>{contact_no}</td>
      <td>
        {email_address ? (
          email_address
        ) : (
          <span className="text-xl text-gray-500">-</span>
        )}
      </td>
      <td>{format(new Date(date_of_joining), "dd-MM-yyy")}</td>
      <td className="flex gap-1 text-white">
        <Link
          to={`edit/${employee_id}`}
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xl"
        >
          <HiPencil />
        </Link>
        <button
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#FF4C60] text-lg"
          onClick={() => onDeleteEmployee(employee_id, name)}
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
