import {
  CircularProgress,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import EZ_Button from "../components/EZ_Button";
import EZ_Input from "../components/EZ_Input";
import EZ_Dropdown from "../components/EZ_Dropdown";
import EZ_Alert from "../components/EZ_Alert";
import { sendData } from "../config/firebasemethods";
import { BlurCircularSharp } from "@mui/icons-material";

export default function TrainerRegistration() {
  const [model, setModel] = useState({});
  const [qualification, setQualification] = useState("");
  const [listOfQualifications, setListOfQualifications] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setServerity] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submitTrainerRegistration = () => {
    setLoading(true);
    sendData(model, "trainerRegistrationData")
      .then((success) => {
        console.log(success);
        setLoading(false);
        setAlertMessage(success);
        setTimeout(() => {
          setAlertMessage("");
          setServerity("");
        }, 3000);
        setServerity("success");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setAlertMessage(err);
        setServerity("error");
        setTimeout(() => {
          setAlertMessage("");
          setServerity("");
        }, 3000);
      });
  };

  useEffect(() => {
    console.log(model);
  }, [model]);

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
        Trainer Registration System
      </Typography>
      <Container maxWidth="lg">
        <Grid spacing={6} container>
          <Grid item md={4}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, firstName: e.target.value });
              }}
              label="First Name"
            />
          </Grid>
          <Grid item md={4}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, lastName: e.target.value });
              }}
              label="Last Name"
            />
          </Grid>
          <Grid item md={4}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, CNIC: e.target.value });
              }}
              label="CNIC"
            />
          </Grid>
          <Grid item md={4}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, qualification: e.target.value });
              }}
              label="Qualification"
            />
          </Grid>
          <Grid item md={4}>
            <EZ_Input label="Contact" />
          </Grid>
          {listOfQualifications.length > 0 ? (
            <Grid item md={6}>
              <List>
                {listOfQualifications.length > 0
                  ? listOfQualifications.map((e, i) => (
                      <ListItemButton
                        key={i}
                        style={{
                          border: "1px solid black",
                          margin: "1px 0px",
                          borderRadius: "5px",
                        }}
                      >
                        <ListItemText>
                          <span style={{ fontWeight: "bold" }}>
                            Qualification {i + 1}:{" "}
                          </span>{" "}
                          {e}
                        </ListItemText>
                      </ListItemButton>
                    ))
                  : null}
              </List>
            </Grid>
          ) : null}

          <Grid item md={6}>
            <EZ_Input
              onChange={(e) => {
                setQualification(e.target.value);
              }}
              label="Add Other Qualifications"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                margin: "5px 0px",
              }}
            >
              <EZ_Button
                onClick={() => {
                  if (qualification.length > 0) {
                    listOfQualifications.push(qualification);
                    setListOfQualifications(
                      [...new Set([...listOfQualifications])],
                      qualification
                    );

                    setModel({
                      ...model,
                      otherQualification: [...listOfQualifications],
                    });
                  } else {
                    alert("EMPTY FIELD");
                  }
                }}
                label="Add Qualification"
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <EZ_Dropdown
              displayField="displayName"
              valueField="id"
              onChange={(e) => {
                setModel({ ...model, coursesAllowed: e.target.value });
              }}
              value={model.coursesAllowed}
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
              label="Course Allowed"
            />
          </Grid>
          <Grid
            item
            md={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <EZ_Button
              padding="8px 50px"
              label={
                isLoading ? <CircularProgress color="warning" /> : "Submit"
              }
              color="success"
              onClick={submitTrainerRegistration}
            />
          </Grid>
        </Grid>
        <EZ_Alert alertMessage={alertMessage} severity={severity} />
      </Container>
    </>
  );
}
