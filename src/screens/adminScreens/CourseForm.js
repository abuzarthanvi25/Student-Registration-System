import {
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";

import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import EZ_Button from "../../components/EZ_Button";
import EZ_Dropdown from "../../components/EZ_Dropdown";
import EZ_Input from "../../components/EZ_Input";
import { getData, sendData } from "../../config/firebasemethods";
import SendIcon from "@mui/icons-material/Send";
import EZ_DataGrid from "../../components/EZ_DataGrid";
import EZ_Alert from "../../components/EZ_Alert";

export default function CourseForm() {
  let [courseFormData, setCourseFormData] = useState({});
  const [isLoading, setLoading] = useState(false);
  //
  const [courseList, setCourseList] = useState([]);
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setServerity] = useState("");
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 180,
      headerClassName: "table-header",
    },
    {
      field: "courseName",
      headerName: "Course name",
      headerClassName: "table-header",
      width: 200,
      editable: true,
    },
    {
      field: "courseDuration",
      headerName: "Course Duration (Months)",
      type: "number",
      headerClassName: "table-header",
      width: 135,
      editable: true,
    },
    {
      field: "fee",
      headerName: "Course Fee",
      type: "number",
      headerClassName: "table-header",
      width: 135,
      editable: true,
    },
    {
      field: "noOfQuizzes",
      headerName: "Number of Quizzes",
      type: "number",
      headerClassName: "table-header",
      width: 140,
      editable: true,
    },
    {
      field: "leadTrainer",
      headerName: "Lead Trainer",
      headerClassName: "table-header",
      width: 135,
      editable: true,
    },
    {
      field: "assistantTrainer1",
      headerName: "Assistant Trainer 1",
      headerClassName: "table-header",
      width: 135,
      editable: true,
    },
    {
      field: "assistantTrainer2",
      headerName: "Assistant Trainer 2",
      headerClassName: "table-header",
      width: 135,
      editable: true,
    },
    {
      field: "formStatus",
      headerName: "Form Status",
      headerClassName: "table-header",
      width: 135,
      editable: true,
    },
  ];

  let fillData = (key, value) => {
    courseFormData[key] = value;
    setCourseFormData({ ...courseFormData });
  };

  let removeAlert = () => {
    setTimeout(() => {
      setAlertMessage("");
      setServerity("");
    }, 3000);
  };

  let sendCourseData = (data, node) => {
    setLoading(true);
    sendData(data, node)
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

  let getCourses = () => {
    getData("courses/")
      .then((success) => {
        console.log(success);
        setCourseList(success);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    getCourses();
    console.log(courseList);
  }, []);
  return (
    <>
      <Container maxWidth="lg" style={{ padding: "20px" }}>
        <Typography
          textAlign={"center"}
          variant="h2"
          gutterBottom
          margin={"10px"}
          color={"secondary"}
          fontWeight="bolder"
        >
          Add Courses
        </Typography>
        <Grid container spacing={6}>
          <Grid item md={6}>
            <EZ_Input
              fullWidth={true}
              label="Course Name"
              required={true}
              value={courseFormData.courseName}
              onChange={(e) => {
                fillData("courseName", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={6}>
            <EZ_Input
              fullWidth={true}
              label="Course Duration(months)"
              required={true}
              type="number"
              value={courseFormData.courseDuration}
              onChange={(e) => {
                fillData("courseDuration", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={6}>
            <EZ_Dropdown
              label="Form Status"
              value={courseFormData.formStatus}
              data={[
                {
                  id: true,
                  displayName: "Open",
                },
                {
                  id: false,
                  displayName: "Close",
                },
              ]}
              onChange={(e) => {
                fillData("formStatus", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={6}>
            <EZ_Input
              fullWidth={true}
              label="Number Of Quizzes in the course"
              required={true}
              type="number"
              value={courseFormData.noOfQuizzes}
              onChange={(e) => {
                fillData("noOfQuizzes", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={6}>
            <EZ_Input
              fullWidth={true}
              label="Course Fee"
              required={true}
              value={courseFormData.fee}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rs</InputAdornment>
                ),
              }}
              onChange={(e) => {
                fillData("fee", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={6}>
            <EZ_Input
              fullWidth={true}
              label="Lead Trainer"
              required={true}
              value={courseFormData.leadTrainer}
              onChange={(e) => {
                fillData("leadTrainer", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={6}>
            <EZ_Input
              fullWidth={true}
              label="Assitant Trainer 1"
              required={true}
              onChange={(e) => {
                fillData("assistantTrainer1", e.target.value);
              }}
              value={courseFormData.assistantTrainer1}
            />
          </Grid>
          <Grid item md={6}>
            <EZ_Input
              fullWidth={true}
              label="Assitant Trainer 2"
              required={true}
              value={courseFormData.assistantTrainer2}
              onChange={(e) => {
                fillData("assistantTrainer2", e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", margin: "50px" }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <EZ_Button
                onClick={() => {
                  sendCourseData(courseFormData, "courses/");
                }}
                startIcon={<SendIcon />}
                label="Submit Course"
                color="primary"
                padding="10px 80px"
              />
              <Typography variant="caption" gutterBottom color={"error"}>
                {error}
              </Typography>
            </>
          )}
        </Box>
      </Container>
      <EZ_Alert alertMessage={alertMessage} severity={severity} />
      <Container
        style={{ display: "flex", flexDirection: "column" }}
        maxWidth="xl"
      >
        {courseList && courseList.length > 0 ? (
          <>
            <Typography
              textAlign={"center"}
              variant="h3"
              gutterBottom
              margin={"10px"}
              color={"secondary"}
              fontWeight="bolder"
            >
              My Courses
            </Typography>
            <EZ_DataGrid rows={courseList} columns={columns} />
          </>
        ) : (
          <Box
            style={{
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={"100px"} />
          </Box>
        )}
      </Container>
    </>
  );
}
