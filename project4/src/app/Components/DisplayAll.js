"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/app/Components/Card.js";

const DisplayAll = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
        `https://employee-tqa0.onrender.com/api/v1/employee/all`
        );
        // Assuming the API response data is an object with 'employees' array
        if (response.data.status && Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees);
        } else {
          console.error("Invalid API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error scenarios, e.g., show an error message
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-base-100 p-4">
      {employees.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No employees found</p>
      ) : (
        <div className="flex flex-wrap">
          {employees.map((employee) => (
            <Card key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayAll;
