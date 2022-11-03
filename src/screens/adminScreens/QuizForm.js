import React, { useEffect } from "react";
import { useState } from "react";
import EZ_Input from "../../components/EZ_Input";
import EZ_Button from "../../components/EZ_Button";
import { sendData } from "../../config/firebasemethods";
import { Container } from "@mui/system";
import { Grid, Typography, Checkbox, FormControlLabel } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";

export default function QuizForm() {
  let [quizFormData, setQuizFormData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [correctOption, setCorrectOption] = useState(false);

  let fillData = (key, value) => {
    quizFormData[key] = value;
    setQuizFormData({ ...quizFormData });
  };

  let sendQuizData = (data, node) => {
    setLoading(true);
    sendData(data, node)
      .then((success) => {
        setLoading(false);
        console.log(success);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {
    console.log(quizFormData);
  }, [quizFormData]);

  return (
    <>
      <Container maxWidth="lg" style={{ padding: "20px" }}>
        <Typography
          textAlign={"center"}
          variant="h2"
          gutterBottom
          margin={"10px"}
          color={"primary"}
          fontWeight="bolder"
        >
          Quiz Form
        </Typography>
        <Grid container spacing={6}>
          <Grid item md={4}>
            <EZ_Input
              label="Quiz Name"
              required={true}
              fullWidth={true}
              value={quizFormData.quizName}
              onChange={(e) => {
                fillData("QuizName", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <EZ_Input
              label="Quiz Duration"
              required={true}
              fullWidth={true}
              value={quizFormData.quizDuration}
              onChange={(e) => {
                fillData("quizDuration", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <EZ_Input
              label="Quiz Marks"
              required={true}
              fullWidth={true}
              value={quizFormData.quizMarks}
              onChange={(e) => {
                fillData("quizMarks", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <EZ_Button label="Add Quiz" startIcon={<AddCircleIcon />} />
          </Grid>
          <Grid item md={12}>
            <EZ_Input
              label="Question"
              required={true}
              fullWidth={true}
              value={quizFormData.Question}
              onChange={(e) => {
                fillData("Question", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => {
                      setCorrectOption(event.target.checked);
                    }}
                    size="small"
                  />
                }
                label="Correct?"
              />
              <EZ_Input
                margin="0px 0px 0px 30px"
                label="Add option"
                required={true}
                // fullWidth={true}
                onChange={(e) => {
                  setCurrentOption(e.target.value);
                }}
              />
            </div>
            {
              <ul>
                {options.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            }
            <EZ_Button
              margin="10px 0px"
              label="Add Option"
              startIcon={<AddCircleIcon />}
              onClick={() => {
                if (correctOption) {
                  options.push(currentOption);
                  setOptions([...new Set([...options])], currentOption);
                  fillData("correctOption", currentOption);
                } else {
                  [...new Set([...options])];
                  options.push(currentOption);
                  setOptions([...new Set([...options])]);
                  fillData("options", options);
                }
              }}
            />
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <EZ_Button
            label="Submit"
            color="primary"
            startIcon={<SendIcon />}
            padding="10px 40px"
            margin="20px"
            onClick={() => {
              sendQuizData(quizFormData, "quizData");
            }}
          />
        </div>
      </Container>
    </>
  );
}
