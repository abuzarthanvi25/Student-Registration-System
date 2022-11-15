import { CircularProgress, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import EZ_Alert from "../../components/EZ_Alert";
import EZ_Button from "../../components/EZ_Button";
import EZ_DataGrid from "../../components/EZ_DataGrid";
import EZ_Input from "../../components/EZ_Input";
import { getData, sendData } from "../../config/firebasemethods";

export default function AddCountry() {
  const [model, setModel] = useState({});
  const [countries, setCountries] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setServerity] = useState("");

  let removeAlert = () => {
    setTimeout(() => {
      setAlertMessage("");
      setServerity("");
    }, 3000);
  };

  let getCountries = () => {
    getData("countries")
      .then((response) => {
        console.log(response);
        setCountries(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let sendCountryData = () => {
    setLoading(true);
    sendData(model, "countries")
      .then((success) => {
        console.log(success);
        setLoading(false);
        setAlertMessage(success);
        setServerity("success");
        removeAlert();
      })
      .catch((error) => {
        setLoading(false);
        setAlertMessage(err);
        setServerity("error");
        removeAlert();
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(model);
    getCountries();
  }, []);
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
        color={"primary"}
        fontWeight="bolder"
      >
        Add Country
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
              onChange={(e) => {
                setModel({ ...model, countryName: e.target.value });
              }}
              label="Country Name"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, countryCode: e.target.value });
              }}
              label="Country Code"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, currency: e.target.value });
              }}
              label="Currency"
            />
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            md={12}
          >
            <EZ_Button
              onClick={sendCountryData}
              padding="8px 50px"
              color="success"
              label={
                isLoading ? <CircularProgress color="warning" /> : "Submit"
              }
            />
          </Grid>
        </Grid>
        <EZ_Alert alertMessage={alertMessage} severity={severity} />
        <EZ_DataGrid
          rows={countries}
          columns={[
            {
              field: "id",
              headerName: "ID",
              width: 200,
              headerClassName: "table-header",
            },
            {
              field: "countryName",
              headerName: "Country name",
              headerClassName: "table-header",
              width: 200,
              editable: true,
            },
            {
              field: "countryCode",
              headerName: "Country Code",
              headerClassName: "table-header",
              width: 200,
              editable: true,
            },
            {
              field: "currency",
              headerName: "Respective Currency",
              headerClassName: "table-header",
              width: 200,
              editable: true,
            },
          ]}
        />
      </Container>
    </>
  );
}
