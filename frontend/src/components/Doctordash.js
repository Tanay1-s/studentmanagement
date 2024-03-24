import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Doctordash = () => {
  const { state } = useLocation();
  const { idte, namet } = state;
  const navigate = useNavigate();

  const [studentsa, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/fetch_student");
        if (!res.ok) {
          console.log("error fetching students");
        }
        const data = await res.json();
        console.log(data);
        setStudents(data);
        console.log(idte);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/delete_student/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        console.log("error deleting student");
      }
      alert("student deleted successfully");
      console.log("student successfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudents = studentsa.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.enroll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello {namet} !</h1>
      <input
        type="text"
        placeholder="Search students..."
        value={searchQuery}
        onChange={handleInputChange}
        className="px-4 py-2 mt-14 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4 mx-12"
      />
      <div className="flex px-20 mx-12 my-5 items-center space-x-4 py-2 border-b border-gray-200">
        <h1 className="flex-none font-bold text-lg">Serial No. </h1>
        <h1 className="flex-1 font-bold text-lg">Student Name</h1>
        <h1 className="flex-1 font-bold text-lg">Enroll.No</h1>
        <h1 className="flex-1 font-bold text-lg">Email</h1>
        <h1 className="flex-1 font-bold text-lg">Profile</h1>
        {/* <h1 className="flex-1 font-bold text-lg">Actions</h1> */}
        <FontAwesomeIcon icon={faTrash} className="text-white " />
      </div>

      {filteredStudents.map((student, index) => (
        <div
          key={student._id}
          className="flex mx-12 px-20 my-5 items-center space-x-4 py-2 border-b border-gray-200"
        >
          <h1 className="flex-none">Serial No. {index + 1}</h1>
          <h1 className="flex-1">{student.name}</h1>
          <h1 className="flex-1">{student.enroll}</h1>
          <h1 className="flex-1">{student.email}</h1>
          <button className="flex-1">
            <Link to={`/studentprofile/${student._id}/${idte}`}>
              View Profile
            </Link>
          </button>
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer"
            onClick={() => deleteStudent(student._id)}
          />
        </div>
      ))}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Doctordash;
