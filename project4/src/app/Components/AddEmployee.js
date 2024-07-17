"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEmployee = ({ onEmployeeAdded }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [priority, setPriority] = useState("High"); // Default priority

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${window.location.origin}/api/v1/employee/add`,
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

        // Optionally reset form fields after successful submission
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setPriority("High"); // Reset priority to default

        // Close the modal/dialog after submission
        document.getElementById("my_modal_3").close();

        // Reload the main page after closing the modal
        window.location.reload();
      } else {
        toast.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error while adding employee:", error);
      toast.error("Failed to add employee");
      // Handle error scenarios, e.g., display an error message to the user
    }
  };

  const handleCloseModal = () => {
    document.getElementById("my_modal_3").close();
    window.location.reload();
  };

  return (
    <div>
      <button
        className="btn fixed bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-md hover:from-purple-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add Employee
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-300 hover:text-white"
              onClick={handleCloseModal}
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddEmployee;
