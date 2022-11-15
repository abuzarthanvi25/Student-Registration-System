import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EZ_Input from "../../components/EZ_Input";
import EZ_Button from "../../components/EZ_Button";
import { getData, sendData } from "../../config/firebasemethods";
import EZ_Alert from "../../components/EZ_Alert";
import EZ_DataGrid from "../../components/EZ_DataGrid";

export default function AddCity() {
  const [model, setModel] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setServerity] = useState("");

  let removeAlert = () => {
    setTimeout(() => {
      setAlertMessage("");
      setServerity("");
    }, 3000);
  };

  const getCities = () => {
    getData("cities")
      .then((response) => {
        console.log(response);
        setCities(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendCitiesData = () => {
    setLoading(true);
    model.length > 0
      ? sendData(model, "cities")
          .then((success) => {
            setLoading(false);
            setAlertMessage(success);
            setServerity("success");
            removeAlert();
            console.log(success);
          })
          .catch((error) => {
            setLoading(false);
            setAlertMessage(err);
            setServerity("error");
            removeAlert();
            console.log(error);
          })
      : alert("NO DATA TO SEND");
    setLoading(false);
  };

  useEffect(() => {
    getCities();
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
        Add City
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
                setModel({ ...model, cityName: e.target.value });
              }}
              label="City Name"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, cityCode: e.target.value });
              }}
              label="City Code"
            />
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            md={12}
          >
            <EZ_Button
              onClick={sendCitiesData}
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
          rows={cities}
          columns={[
            {
              field: "id",
              headerName: "ID",
              width: 200,
              headerClassName: "table-header",
            },
            {
              field: "cityName",
              headerName: "City Name",
              headerClassName: "table-header",
              width: 200,
              editable: true,
            },
            {
              field: "cityCode",
              headerName: "City Code",
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
