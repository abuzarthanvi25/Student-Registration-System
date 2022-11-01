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
import { sendData } from "../../config/firebasemethods";

export default function CourseForm() {
  let [courseFormData, setCourseFormData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let fillData = (key, value) => {
    courseFormData[key] = value;
    setCourseFormData({ ...courseFormData });
  };

  let sendCourseData = (data, node) => {
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
    console.log(courseFormData);
  }, [courseFormData]);
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
        Course Form
      </Typography>
      <Container maxWidth="lg" style={{ padding: "20px" }}>
        <Grid container spacing={6}>
          <Grid item md={4}>
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
          <Grid item md={4}>
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
          <Grid item md={4}>
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
          <Grid item md={4}>
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
          <Grid item md={4}>
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
          <Grid item md={4}>
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
          <Grid item md={4}>
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
          <Grid item md={4}>
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
                label="Submit"
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
    </>
  );
}
