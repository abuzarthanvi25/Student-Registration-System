import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getData } from "../config/firebasemethods";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function UserQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  let navigate = useNavigate();

  const getQuizzes = () => {
    getData("quizData")
      .then((response) => {
        setQuizzes(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <>
      <Typography
        textAlign={"center"}
        variant="h2"
        gutterBottom
        margin={"10px"}
        color={"primary"}
        fontWeight="bolder"
      >
        Attempt Quizzes
      </Typography>

      <Container maxWidth="lg" style={{ padding: "0px 20px " }}>
        <Grid container>
          {quizzes && quizzes.length > 0 ? (
            quizzes.map((e, i) => (
              <Grid
                style={{
                  border: "2px solid lightgrey",
                  borderRadius: "10px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  margin: "0px 10px",
                  padding: "10px",
                }}
                key={i}
                onClick={() => {
                  navigate("/showquiz", {
                    state: e,
                  });
                }}
                className="card"
                item
                md={4}
              >
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="h5"
                  gutterBottom
                >
                  QUIZ NAME:{" "}
                  {
                    <span style={{ color: "#005fa8", fontWeight: "500" }}>
                      {e.QuizName}
                    </span>
                  }
                </Typography>
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="h5"
                  gutterBottom
                >
                  COURSE:{" "}
                  {
                    <span style={{ color: "#005fa8", fontWeight: "500" }}>
                      {e.course}
                    </span>
                  }
                </Typography>
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="h5"
                  gutterBottom
                >
                  QUIZ MARKS:{" "}
                  {
                    <span style={{ color: "#005fa8", fontWeight: "500" }}>
                      {e.quizMarks} Marks
                    </span>
                  }{" "}
                </Typography>
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="h5"
                  gutterBottom
                >
                  QUIZ DURATION:{" "}
                  {
                    <span style={{ color: "#005fa8", fontWeight: "500" }}>
                      {e.quizDuration} Minutes
                    </span>
                  }
                </Typography>
              </Grid>
            ))
          ) : (
            <Box
              style={{
                height: "40vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={"100px"} />
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
}
