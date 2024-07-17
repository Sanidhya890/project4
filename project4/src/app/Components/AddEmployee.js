"use client"
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEmployee = ({ onEmployeeAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [priority, setPriority] = useState("High");

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setPriority("High");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://employee-tqa0.onrender.com/api/v1/employee/add`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone_no: phone,
          company,
          priority,
        }
      );

      if (response.data.status) {
        toast.success("Employee added successfully!");

        // Notify parent component about the new employee
        if (typeof onEmployeeAdded === "function") {
          onEmployeeAdded(response.data.employee);
        }

        closeModal(); // Close modal after successful submission
      } else {
        toast.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error while adding employee:", error);
      toast.error("Failed to add employee");
    }
  };

  return (
    <div>
      <button
        className="btn fixed bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-md hover:from-purple-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        onClick={openModal}
      >
        Add Employee
      </button>

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="modal-box bg-gray-900 text-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-300 hover:text-white"
                  onClick={closeModal}
                >
                  ✕
                </button>
                <h3 className="text-xl font-semibold mb-4">Add Employee</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                {/* Other input fields for Last Name, Email, Phone, Company, Priority */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
