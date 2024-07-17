"use client"
import React, { useState } from "react";
import axios from "axios";
import Card from "@/app/Components/Card.js"; // Adjust the import path as per your project structure

const SearchBox = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    firstName: "",
    lastName: "",
    priority: "", // Default to empty string
  });
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false); // State to manage dialog visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const { firstName, lastName, priority } = searchCriteria;

      // Validate that either firstName or lastName is filled
      if (!firstName && !lastName) {
        setError("Please fill at least Firstname or Lastname");
        return;
      }

      // Validate that priority is filled
      if (!priority) {
        setError("Please select a priority");
        return;
      }

      const response = await axios.get(
        `${window.location.origin}/api/v1/employee/search`,
        {
          params: {
            first_name: firstName || undefined,
            last_name: lastName || undefined,
            priority: priority || undefined,
          },
        }
      );
      if (response.data.success) {
        setSearchResults(response.data.employees);
        setError(null);
        setShowDialog(true); // Show the dialog after successful search
      } else {
        setError(response.data.message);
        setSearchResults([]);
        setShowDialog(false);
      }
    } catch (error) {
      console.error("Error searching employees:", error);
      setError("Failed to search employees");
      setSearchResults([]);
      setShowDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    window.location.reload(); // Reload the page after closing the dialog
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-base-100">
      <div className="w-full max-w-screen-xl flex space-x-4">
        <input
          type="text"
          name="firstName"
          value={searchCriteria.firstName}
          onChange={handleInputChange}
          placeholder="Search by Firstname"
          className="flex-1 px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <input
          type="text"
          name="lastName"
          value={searchCriteria.lastName}
          onChange={handleInputChange}
          placeholder="Search by Lastname"
          className="flex-1 px-4 py-2 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <select
          name="priority"
          value={searchCriteria.priority}
          onChange={handleInputChange}
          className="px-4 py-2 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Filter by priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="modal-box bg-black text-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <button
              onClick={handleCloseDialog}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((employee) => (
                <Card key={employee._id} employee={employee} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
