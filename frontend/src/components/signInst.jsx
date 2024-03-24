import s from "./student.module.css";
import { Button, Box, TextField, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const StudentLogin = () => {
  const navigate = useNavigate();

  const gotostsignup = () => {
    navigate("/studentsignup");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signin() {
    console.log(email, password);
    const payload = { email: email, password: password };
    const response = await axios.post(
      "http://localhost:5000/api/student_signin",
      payload
    );
    if (response.status === 200) {
      console.log(response.data.id);

      navigate("/studentdashboard", { state: { id: response.data.id } });
    }
    console.log(response);
  }

  return (
    <div>
      <h1 className={s.heading}>Student Login</h1>

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
            <Button variant="contained" onClick={signin}>
              Login
            </Button>
          </Stack>
        </div>
      </div>
      <div>
        <div className={s.bottom}>
          <Stack spacing={2}>
            <Button onClick={gotostsignup}>Sign Up</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
