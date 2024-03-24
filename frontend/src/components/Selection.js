import React from "react";

import { Box, ThemeProvider } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Selection = () => {
  const navigate = useNavigate();

  const studentClick = () => {
    navigate("/studentsignin");
  };
  const teacherClick = () => {
    navigate("/teachersignin");
  };

  return (
    <div>
      <div className="flex flex-row justify-center mt-20">
        <h1 style={{ fontSize: "2rem", margin: "1rem 0", fontWeight: "bold" }}>
          Login
        </h1>
      </div>
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "#007FFF",
              dark: "#0066CC",
            },
          },
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          marginTop={20}
          gap={60}
        >
          <span onClick={studentClick}>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: 2,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
              color={"white"}
              fontSize={20}
              fontWeight={"bold"}
            >
              STUDENT
            </Box>
          </span>
          <span onClick={teacherClick}>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: 2,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
              color={"white"}
              fontSize={20}
              fontWeight={"bold"}
            >
              TEACHER
            </Box>
          </span>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Selection;
