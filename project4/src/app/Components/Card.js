import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Card = ({ employee }) => {
  const URL="https://employee-tqa0.onrender.com";
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${URL}/api/v1/employee/delete/${employee._id}`
      );
      window.location.reload();
    //   if (response.data.status) {
    //     toast.success("Employee deleted successfully");
    //     window.location.reload();
    //   } else {
    //     toast.error("Failed to delete employee");
    //   }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="card bg-white shadow-md rounded-lg p-6 mx-4 my-4 flex-shrink-0 w-80">
      <h2 className="text-lg font-bold text-gray-600">{`${employee.first_name} ${employee.last_name}`}</h2>
      <p className="text-gray-600">{employee.email}</p>
      <p className="text-gray-600">{employee.company}</p>
      <p className="text-gray-600">{employee.phone_no}</p>
      <p className="text-gray-600">Priority: {employee.priority}</p>
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-primary" onClick={handleDelete}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Card;
