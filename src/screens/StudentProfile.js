import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "../App.css";

function StudentProfile() {
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
        Student Profile
      </Typography>
      <Container maxWidth="sm">
        <Grid
          container
          style={{
            border: "1px solid lightgrey",
            padding: "20px",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            borderRadius: "10px",
          }}
        >
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
            item
            md={12}
          >
            <div className="profile"></div>
          </Grid>
          <Grid item md={12}>
            <Typography
              style={{
                margin: "20px 0px",
                color: "#005fa8",
                fontWeight: "bold",
              }}
              variant="h6"
              textAlign={"left"}
              gutterBottom
            >
              STUDENT NAME :{" "}
              {
                <span style={{ color: "black", fontWeight: "500" }}>
                  ABUZAR
                </span>
              }
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography
              style={{
                margin: "20px 0px",
                color: "#005fa8",
                fontWeight: "bold",
              }}
              variant="h6"
              textAlign={"left"}
              gutterBottom
            >
              FATHER NAME :{" "}
              {
                <span style={{ color: "black", fontWeight: "500" }}>
                  MUHAMMAD AZHAR
                </span>
              }
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography
              style={{
                margin: "20px 0px",
                color: "#005fa8",
                fontWeight: "bold",
              }}
              variant="h6"
              textAlign={"left"}
              gutterBottom
            >
              CNIC :{" "}
              {
                <span style={{ color: "black", fontWeight: "500" }}>
                  78687687687687
                </span>
              }
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography
              style={{
                margin: "20px 0px",
                color: "#005fa8",
                fontWeight: "bold",
              }}
              variant="h6"
              textAlign={"left"}
              gutterBottom
            >
              CONTACT :{" "}
              {
                <span style={{ color: "black", fontWeight: "500" }}>
                  13131313322
                </span>
              }
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography
              style={{
                margin: "20px 0px",
                color: "#005fa8",
                fontWeight: "bold",
              }}
              variant="h6"
              textAlign={"left"}
              gutterBottom
            >
              REGISTRATION DATE :{" "}
              {
                <span style={{ color: "black", fontWeight: "500" }}>
                  11-11-22
                </span>
              }
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default StudentProfile;
