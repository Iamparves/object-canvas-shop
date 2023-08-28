import React from "react";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const CustomerRow = ({ customer, index, onDeleteCustomer }) => {
  const { customer_id, name, contact_no, opening_due, customer_type } =
    customer;
  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
      <td>{contact_no}</td>
      <td>{opening_due}</td>
      <td>{customer_type}</td>
      <td className="flex gap-1 text-white">
        <Link
          to={`edit/${customer_id}`}
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xl"
        >
          <HiPencil />
        </Link>
        <button
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#FF4C60] text-lg"
          onClick={() => onDeleteCustomer(customer_id)}
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default CustomerRow;
