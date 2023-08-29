import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import CustomerRow from "../components/CustomerRow";
import { deleteCustomer, getCustomers } from "../utils/apiRequest";

const Customer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const { pathname, state } = useLocation();

  const loadAllCustomers = async () => {
    setIsLoading(true);
    setCustomers([]);

    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const onDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      loadAllCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllCustomers();
  }, []);

  useEffect(() => {
    if (pathname === "/customer" && state?.reload) {
      loadAllCustomers();
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
              Customer List
            </h2>
            <Link
              to="add"
              className={`rounded-full bg-primary px-5 py-3 text-sm font-medium text-white sm:text-base ${
                isLoading
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Add Customer
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
                  <th>Opening Due</th>
                  <th>Customer Type</th>
                  <th>Employee</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 &&
                  customers.map((customer, index) => (
                    <CustomerRow
                      key={customer.customer_id}
                      index={index + 1}
                      customer={customer}
                      onDeleteCustomer={onDeleteCustomer}
                    />
                  ))}
              </tbody>
            </table>
            {isLoading && (
              <div className="flex justify-center py-10">
                <span className="loading loading-ring loading-lg bg-primary"></span>
              </div>
            )}
            {!isLoading && customers.length === 0 && (
              <div className="flex justify-center px-3 py-10">
                <p className="text-center text-gray-400">
                  There are no customers in the database. try adding some
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

export default Customer;
