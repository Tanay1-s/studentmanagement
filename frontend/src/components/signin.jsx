import s from "./teacher.module.css";
import { Button, Box, TextField, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const TeacherLogin = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginButton() {
    console.log(email, password);
    const payload = { email: email, pass: password };

    try {
      axios
        .post("http://localhost:5000/api/teacher_signin", payload)
        .then((response) => {
          console.log(response);
          console.log(response.status);

          if (response.status === 200) {
            console.log(response.data.id);
            console.log(response.data.teacher.name);

            nav("/teacherdashboard", {
              state: {
                idte: response.data.id,
                namet: response.data.teacher.name,
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error occurred while logging in:", error);
        });
    } catch (error) {
      // Handle errors here
      console.error("Error occurred while logging in:", error);
    }
  }
  const gotosignup = () => {
    nav("/teachersignup");
  };
  return (
    <div>
      <h1 className={s.heading}>Teacher Login</h1>

      <div className={s.container}>
        <div className={s.box}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "35ch" },
            }}
            noValidate
            autoComplete="off"
            display={"flex"}
            flexDirection={"column"}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Stack
            direction="row"
            display={"flex"}
            justifyContent={"center"}
            marginTop={4}
          >
            <Button variant="contained" onClick={loginButton}>
              Login
            </Button>
          </Stack>
        </div>
      </div>
      <div>
        <div className={s.bottom}>
          <Stack spacing={2}>
            <Button onClick={gotosignup}>Sign Up</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
