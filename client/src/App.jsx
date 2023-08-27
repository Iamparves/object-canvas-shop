import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Customer from "./pages/customer";
import Employee from "./pages/employee";
import Home from "./pages/home";
import PageNotFound from "./pages/pageNotFound";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/employee" element={<Employee />}>
          <Route
            path="add"
            element={
              <Modal>
                <EmployeeForm />
              </Modal>
            }
          />
          <Route
            path="edit/:employeeId"
            element={
              <Modal>
                <EmployeeForm />
              </Modal>
            }
          />
        </Route>
        <Route path="/customer" element={<Customer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
