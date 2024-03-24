import React, { useState, useEffect, useLocation } from "react";
import pdf from "./pdficon.png";
import { useParams, useNavigate } from "react-router-dom";

const StudentProfile = () => {
  // const location = useLocation();
  // const id = location.state.id;
  const navigate = useNavigate();
  const { id, idte } = useParams();
  const [student, setStudent] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/fetch_singlestudent/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, [id]);

  if (!student) {
    return (
      <div>
        Loading...
        {console.log(id)}
      </div>
    );
  }

  // Function to handle changes in the input field

  const handleInputChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("save note hit");
    sendNote(); // Call the sendNote function directly when form is submitted
  };
  const sendNote = async () => {
    try {
      const data = {
        studID: id,
        message: note,
      };

      fetch(`http://localhost:5000/api/send_message/${idte}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((dt) => {
          console.log(dt, "hel");
        })
        .catch((err) => console.log(err));

      // if (!response.ok) {
      //   throw new Error("Failed to send note");
      // }

      // const responseData = await response.json();
      // console.log(responseData);
      // console.log("Note sent successfully");

      setNote("");
    } catch (error) {
      console.error("Error sending note:", error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-semibold mb-4">{student.name}</h1>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-lg mb-3">
            <span className="font-semibold">Class:</span> {student.Class}
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold">Section:</span> {student.section}
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold">Email:</span> {student.email}
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold">Branch:</span> {student.branch}
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold">Enrollment Number:</span>{" "}
            {student.enroll}
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold">College Year:</span> {student.year}
          </p>
        </div>
        <div>
          <div className="mb-6">
            <p className="font-semibold text-lg mb-2">Academic Achievements:</p>
            <ul className="list-none pl-6">
              {student.acadach.map((achievement, index) => (
                <li key={index} className="text-lg mb-1">
                  {achievement.title} ({achievement.year}, {achievement.sem}{" "}
                  sem)
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <p className="font-semibold text-lg mb-2">
              Extra Curricular Achievements:
            </p>
            <ul className="list-none pl-6">
              {student.excurr.map((achievement, index) => (
                <div className="flex justify-center items-center">
                  <div>
                    <li key={index} className="text-lg mb-1">
                      {achievement.title} ({achievement.year}, {achievement.sem}{" "}
                      sem)
                    </li>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-lg mb-2">Certificates:</p>
            <div className="grid grid-cols-2 gap-4">
              {student.certificates.map((certificate, index) => (
                <a
                  key={index}
                  href={certificate.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg mb-3"
                >
                  <div className="w-12 h-12 bg-blue-300 flex justify-center items-center rounded-md mr-2">
                    <img src={pdf} alt="PDF Icon" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-lg">{certificate.name}</span>
                    <p className="text-sm">{certificate.domain}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 w-1/3 flex justify-center items-center">
        <h2 className="font-semibold text-lg mb-2">Enter Note</h2>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <textarea
            type="text"
            value={note}
            onChange={handleInputChange}
            placeholder="Enter your note..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-lg"
          >
            Save Note
          </button>
        </form>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none text-lg"
      >
        Log out
      </button>
    </div>
  );
};

export default StudentProfile;
