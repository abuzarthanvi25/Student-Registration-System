import React, { useEffect } from "react";
import { useState } from "react";
import EZ_Input from "../../components/EZ_Input";
import EZ_Button from "../../components/EZ_Button";
import EZ_Dropdown from "../../components/EZ_Dropdown";
import { sendData } from "../../config/firebasemethods";
import { Container } from "@mui/system";
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import LockIcon from "@mui/icons-material/Lock";
import EZ_Alert from "../../components/EZ_Alert";

export default function QuizForm() {
  let [quizFormData, setQuizFormData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCreateQuiz, setIsCreateQuiz] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [correctOption, setCorrectOption] = useState(false);
  const [quizQuestionModel, setQuizQuestionModel] = useState({});
  const [listOfModels, setListOfModels] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setServerity] = useState("");

  let fillData = (key, value) => {
    quizFormData[key] = value;
    setQuizFormData({ ...quizFormData });
  };

  let removeAlert = () => {
    setTimeout(() => {
      setAlertMessage("");
      setServerity("");
    }, 3000);
  };

  let sendQuizData = () => {
    setLoading(true);
    sendData(quizFormData, "quizData/")
      .then((success) => {
        setLoading(false);
        setAlertMessage(success);
        setServerity("success");
        removeAlert();
        console.log(success);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setAlertMessage(err);
        setServerity("error");
        removeAlert();
        setError(err);
      });
  };

  let createQuiz = () => {
    setIsCreateQuiz(true);
  };

  let addModel = () => {
    listOfModels.push(quizQuestionModel);
    setListOfModels([...listOfModels]);
    setQuizQuestionModel({});
    setOptions([]);
    // cleanerFunction();
    console.log(quizQuestionModel);
    console.log(listOfModels);
  };

  const cleanerFunction = () => {
    setQuizQuestionModel({});
    setOptions([]);
    setCorrectOption("");
  };

  useEffect(() => {
    console.log(quizFormData);
    console.log(quizQuestionModel);
  }, [quizFormData]);

  return (
    <>
      <Typography
        textAlign={"center"}
        variant="h2"
        style={{
          backgroundColor: "#005fa8",
          color: "white",
          borderRadius: "10px",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
        gutterBottom
        margin={"10px"}
        color={"secondary"}
        fontWeight="bolder"
      >
        Quiz Form
      </Typography>
      <Container maxWidth="lg" style={{ padding: "20px" }}>
        <Grid
          container
          style={{
            marginBottom: "40px",
            marginTop: "20px",
            padding: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            borderRadius: "20px",
          }}
          spacing={3}
        >
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              label="Quiz Name"
              disabled={isCreateQuiz}
              required={true}
              fullWidth={true}
              value={quizFormData.quizName}
              onChange={(e) => {
                fillData("quizName", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              label="Quiz Duration"
              disabled={isCreateQuiz}
              required={true}
              fullWidth={true}
              value={quizFormData.quizDuration}
              onChange={(e) => {
                fillData("quizDuration", e.target.value);
              }}
            />
          </Grid>
          <Grid md={6} sm={12} xs={12} item>
            <EZ_Dropdown
              label="Course"
              onChange={(e) => fillData("course", e.target.value)}
              disabled={isCreateQuiz}
              data={[
                {
                  id: "OOP",
                  displayName: "Object Oriented Programming",
                },
                {
                  id: "RDBMS",
                  displayName: "Relational Database Management",
                },
                {
                  id: "networking",
                  displayName: "Practical Networking",
                },
                {
                  id: "dataMining",
                  displayName: "Data Mining",
                },
              ]}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              label="Quiz Marks"
              disabled={isCreateQuiz}
              required={true}
              fullWidth={true}
              value={quizFormData.quizMarks}
              onChange={(e) => {
                fillData("quizMarks", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <EZ_Button
                label="Create Quiz"
                onClick={createQuiz}
                startIcon={<AddCircleIcon />}
              />
            </Box>
          </Grid>
        </Grid>

        {isCreateQuiz && (
          <Grid
            container
            style={{
              marginTop: "10px",
              padding: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              borderRadius: "20px",
            }}
            spacing={3}
          >
            <Grid item md={12} sm={12} xs={12}>
              <Typography
                textAlign={"center"}
                color="secondary"
                fontWeight={"bold"}
                variant="h6"
                gutterBottom
              >
                ADD QUIZ DETAILS
              </Typography>
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <EZ_Input
                label="Question"
                required={true}
                fullWidth={true}
                value={quizFormData.question}
                onChange={(e) => {
                  setQuizQuestionModel({
                    ...quizQuestionModel,
                    question: e.target.value,
                  });
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
              {options && options.length > 0 ? (
                <div>
                  <List
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    {options.map((e, i) => (
                      <ListItemButton
                        style={{
                          border: "1px solid lightgrey",
                          fontWeight: "bolder",
                        }}
                        key={i}
                      >
                        OPTION {i + 1}:
                        <ListItemText
                          style={{
                            color: "#005fa8",
                            paddingLeft: "15px",
                          }}
                          primary={e}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </div>
              ) : null}
              <EZ_Button
                margin="10px 0px"
                label="Add Option"
                startIcon={<AddCircleIcon />}
                onClick={() => {
                  if (currentOption !== "") {
                    if (correctOption) {
                      options.push(currentOption);
                      setOptions([...new Set([...options])], currentOption);
                      // fillData("correctOption", currentOption);
                      setQuizQuestionModel({
                        ...quizQuestionModel,
                        correctOption: currentOption,
                      });
                    } else {
                      [...new Set([...options])];
                      options.push(currentOption);
                      setOptions([...new Set([...options])]);
                      // fillData("options", options);
                      setQuizQuestionModel({
                        ...quizQuestionModel,
                        options: options,
                      });
                    }
                  } else {
                    alert("The Option cannot be empty");
                  }
                }}
              />
            </Grid>
            <Grid
              style={{ display: "flex", justifyContent: "center" }}
              item
              md={12}
            >
              <EZ_Button
                label="Submit Question"
                color="primary"
                startIcon={<SendIcon />}
                // padding="10px 20px"
                margin="20px"
                onClick={() => {
                  addModel();
                }}
              />
            </Grid>
          </Grid>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <EZ_Button
            label={isLoading ? <CircularProgress /> : "Lock Quiz"}
            disabled={!isCreateQuiz}
            color="success"
            startIcon={<LockIcon />}
            padding="10px 40px"
            margin="20px 0px"
            onClick={() => {
              fillData("quizDetails", listOfModels);
              sendQuizData();
              cleanerFunction();
              setIsCreateQuiz(false);
            }}
          />
        </div>
        <EZ_Alert alertMessage={alertMessage} severity={severity} />
      </Container>
    </>
  );
}
