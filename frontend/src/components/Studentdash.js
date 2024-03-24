import React, { useState, useEffect } from "react";
import pdf from "./pdficon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CertificateForm from "./CertificateForm";

const Studentdash = () => {
  // const location = useLocation();
  // const id = location.state.id;
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState([]);
  const [data1, setData1] = useState({
    title: "",
    year: "",
    sem: "",
  });
  const [data2, setData2] = useState({
    title: "",
    year: "",
    sem: "",
  });
  useEffect(() => {
    fetch(`http://localhost:5000/api/fetch_singlestudent/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, [id]);
  const sendex = () => {
    try {
      fetch(`http://localhost:5000/api/add_excurr/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      })
        .then((res) => res.json())
        .then((dt) => {
          console.log(dt, "hel");
          alert("excurr added successfully");
        })
        .catch((err) => console.log(err));

      // if (!response.ok) {
      //   throw new Error("Failed to send note");
      // }

      // const responseData = await response.json();
      // console.log(responseData);
      // console.log("Note sent successfully");
    } catch (error) {
      console.error("Error sending note:", error);
    }
  };
  const sendacad = () => {
    try {
      fetch(`http://localhost:5000/api/add_achivement/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
      })
        .then((res) => res.json())
        .then((dt) => {
          console.log(dt, "hel acad");
          alert("achivement sent successfully");
        })
        .catch((err) => console.log(err));

      // if (!response.ok) {
      //   throw new Error("Failed to send note");
      // }

      // const responseData = await response.json();
      // console.log(responseData);
      // console.log("Note sent successfully");
    } catch (error) {
      console.error("Error sending note:", error);
    }
  };
  useEffect(() => {
    const getmsg = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/get_message/${id}`);
        if (!res.ok) {
          throw new Error("Error fetching students");
        }
        const data = await res.json();
        console.log(data);
        setMessage(data);
      } catch (err) {
        console.log(err);
      }
    };
    getmsg();
  }, []);
  if (!student) {
    return (
      <div>
        Loading...
        {console.log(id)}
      </div>
    );
  }

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setData1({
      ...data1,
      [name]: value,
    });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    // You can use 'data' object here to access the values of title, year, and sem
    console.log("Data submitted:", data1);
    sendex();
    // You can perform further actions like sending data to the server
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setData2({
      ...data2,
      [name]: value,
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    // You can use 'data' object here to access the values of title, year, and sem
    console.log("Data submitted:", data2);
    sendacad();
    // You can perform further actions like sending data to the server
  };
  const deleteectracurr = async (excid) => {
    console.log(excid);
    console.log(student._id);
    const requestBody = {
      studentId: student._id,
      excurrId: excid,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/delete_extracurr",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === 200) {
        alert("Success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const { studentId, acadId } = req.body;
  const deleteadacach = async (acadid) => {
    console.log(acadid);
    console.log(student._id);
    const requestBody = {
      studentId: student._id,
      acadId: acadid,
    };
    try {
      const response = await fetch("http://localhost:5000/api/delete_acadach", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === 200) {
        alert("Success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // useEffect(() => {
  //   const fetchname = async ()=>{
  //     try{
  //       const res = await fetch("http://localhost:5000/api/fetch_teachername");
  //     if (!res.ok) {
  //       throw new Error("Error fetching students");
  //     }
  //     const data = await res.json();
  //     console.log(data);
  //   }
  //     catch(error) {
  //       console.log(error);
  //     }
  //   }
  // },[]);
  // useEffect(() => {
  //   fetchTeacherName(); // Call fetchTeacherNames on component mount
  // }, []);

  return (
    <div className="bg-blue-100 text-blue-900 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">{student.name}</h1>
      <div className="grid grid-cols-2 gap-x-">
        <div className="flex justify-center items-start">
          <div className="">
            <div className="grid grid-cols-2 gap-y-2 border border-gray-300 p-4 rounded-lg shadow-md">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Class:</span>
                <span>{student.Class}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2 ml-6">Section:</span>
                <span>{student.section}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Email:</span>
                <span>{student.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2  ml-6">Branch:</span>
                <span>{student.branch}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Enrollment Number:</span>
                <span>{student.enroll}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2  ml-6">College Year:</span>
                <span>{student.year}</span>
              </div>
            </div>
            <div className="bg-gray-100 text-gray-900 p-6 rounded-lg shadow-md mt-10">
              <h1 className="text-2xl font-semibold mb-4">Messages</h1>
              <div className="grid gap-4">
                {message.map((msg) => (
                  <div
                    key={msg._id}
                    className="border border-gray-300 p-4 rounded-lg shadow-md"
                  >
                    <p className="text-gray-700 mb-2">{msg.message}</p>
                    <p className="text-lg font-semibold mb-2">Teacher ID:</p>
                    <p className="text-gray-700">{msg.teacherID}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p className="font-semibold  text-lg mb-4">
              Academic Achievements:
            </p>
            <div className="flex flex-col items-center">
              {student.acadach.map((achievement, index) => (
                <div
                  key={index}
                  className="w-3/5 border border-blue-600  rounded-lg p-4 mb-2 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">{achievement.title}</p>
                    <p className="text-sm text-gray-500">
                      {achievement.year} - {achievement.sem} semester
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                    onClick={() => deleteadacach(achievement._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-lg mb-4">
              Extra Curricular Achievements:
            </p>
            <div className="flex flex-col items-center">
              {student.excurr.map((achievement, index) => (
                <div
                  key={index}
                  className="w-3/5 border border-blue-600 rounded-lg p-4 mb-2 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">{achievement.title}</p>
                    <p className="text-sm text-gray-500">
                      {achievement.year} - {achievement.sem} semester
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => deleteectracurr(achievement._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold mt-4">
            <p>Certificates:</p>
            <div className="flex justify-center items-center">
              <div className="">
                {student.certificates.map((certificate, index) => (
                  <a
                    key={index}
                    href={certificate.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md mb-2"
                  >
                    <div className="w-12 h-12 bg-blue-300 flex justify-center items-center rounded-md mr-4">
                      <img src={pdf} alt="PDF Icon" className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block">{certificate.name}</span>
                      <p className="text-sm text-gray-500">
                        {certificate.domain}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-16">
        {/* excurr */}
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-4">Add Extra Curricular</h1>
            <form onSubmit={handleSubmit1}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={data1.title}
                  onChange={handleChange1}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Year:
                </label>
                <input
                  type="text"
                  name="year"
                  value={data1.year}
                  onChange={handleChange1}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Sem:
                </label>
                <input
                  type="text"
                  name="sem"
                  value={data1.sem}
                  onChange={handleChange1}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="flex w-1/5  "></div>
        {/* acad */}
        <div className="justify-center items-center flex">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-4">Add Acad achivement</h1>
            <form onSubmit={handleSubmit2}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={data2.title}
                  onChange={handleChange2}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Year:
                </label>
                <input
                  type="text"
                  name="year"
                  value={data2.year}
                  onChange={handleChange2}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Sem:
                </label>
                <input
                  type="text"
                  name="sem"
                  value={data2.sem}
                  onChange={handleChange2}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <CertificateForm ids={id} />
      <button
        onClick={() => {
          navigate("/");
        }}
        className="bg-red-500 mt-20 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Log out
      </button>
    </div>
  );
};

export default Studentdash;
