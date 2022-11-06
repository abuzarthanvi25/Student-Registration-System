import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import EZ_Dropdown from "../../components/EZ_Dropdown";
import EZ_Switch from "../../components/EZ_Switch";
import EZ_Button from "../../components/EZ_Button";
import EZ_DataGrid from "../../components/EZ_DataGrid";
import { getData, sendData } from "../../config/firebasemethods";
import EZ_Alert from "../../components/EZ_Alert";

export default function CreateResult() {
  const [model, setModel] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setServerity] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [courseStatus, setCourseStatus] = useState(false);
  const [resultData, setResultData] = useState([
    {
      id: 1,
      name: "Student1",
      marks: 90,
      rollNum: "std1",
      result: "PASS",
    },
    {
      id: 2,
      name: "Student2",
      marks: 80,
      rollNum: "std2",
      result: "PASS",
    },
    {
      id: 3,
      name: "Student3",
      marks: 50,
      rollNum: "std3",
      result: "PASS",
    },
    {
      id: 4,
      name: "Student4",
      marks: 70,
      rollNum: "std4",
      result: "PASS",
    },
    {
      id: 5,
      name: "Student5",
      marks: 30,
      rollNum: "std5",
      result: "FAIL",
    },
    {
      id: 6,
      name: "Student6",
      marks: 44,
      rollNum: "std6",
      result: "FAIL",
    },
    {
      id: 7,
      name: "Student7",
      marks: 80,
      rollNum: "std7",
      result: "PASS",
    },
    {
      id: 8,
      name: "Student8",
      marks: 75,
      rollNum: "std8",
      result: "PASS",
    },
    {
      id: 9,
      name: "Student9",
      marks: 91,
      rollNum: "std8",
      result: "PASS",
    },
    {
      id: 10,
      name: "Student10",
      marks: 60,
      rollNum: "std10",
      result: "PASS",
    },
  ]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 180,
      headerClassName: "table-header",
    },
    {
      field: "rollNum",
      headerName: "Roll Number",
      headerClassName: "table-header",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 150,
      editable: true,
    },
    {
      field: "marks",
      headerName: "Marks",
      type: "number",
      headerClassName: "table-header",
      width: 135,
      editable: true,
    },
    {
      field: "result",
      headerName: "Result",
      headerClassName: "table-header",
      width: 135,
      editable: true,
    },
  ];
  const [resultFromDb, setResltFromDb] = useState([]);

  const submitForm = () => {
    setLoading(true);
    model.isShowResult = courseStatus;
    model.result = resultData;
    console.log(model);
    sendData(model, "results/")
      .then((success) => {
        setLoading(false);
        setAlertMessage(success);
        setTimeout(() => {
          setAlertMessage("");
          setServerity("");
        }, 3000);
        setServerity("success");
        console.log(success);
      })
      .catch((error) => {
        setLoading(false);
        setAlertMessage(err);
        setServerity("error");
        setTimeout(() => {
          setAlertMessage("");
          setServerity("");
        }, 3000);
        console.log(error);
      });
  };

  const getResultData = () => [
    getData("results/")
      .then((data) => {
        console.log(data);
        setResltFromDb(data);
      })
      .catch((error) => {
        console.log(error);
      }),
  ];

  useEffect(() => {
    getResultData();
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
          Create Result
        </Typography>
        <Box>
          <Grid container>
            <Grid item md={6}>
              <FormControlLabel
                style={{ color: "#005fa8" }}
                control={
                  <EZ_Switch
                    value={courseStatus}
                    onChange={(e) => setCourseStatus(e.target.checked)}
                    label="Course"
                  />
                }
                label="Course Status"
              />
            </Grid>
            <Grid item md={6}>
              <EZ_Dropdown
                label="Course"
                displayField="fullName"
                data={[
                  {
                    id: "OOP",
                    fullName: "Object Oriented Programming",
                  },
                  {
                    id: "RDBMS",
                    fullName: "Relational Database Management",
                  },
                  {
                    id: "networking",
                    fullName: "Practical Networking",
                  },
                  {
                    id: "dataMining",
                    fullName: "Data Mining",
                  },
                ]}
                onChange={(e) => {
                  setModel({ ...model, course: e.target.value });
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "40px 0px 50px 0px",
              }}
              item
              md={12}
            >
              <EZ_Button
                label={
                  isLoading ? <CircularProgress color="warning" /> : "Submit"
                }
                onClick={submitForm}
              />
            </Grid>
            <Grid item md={12}>
              <EZ_Alert alertMessage={alertMessage} severity={severity} />
            </Grid>
          </Grid>
        </Box>
        <Box margin={"10px"}>
          <EZ_DataGrid rows={resultData} columns={columns} />
        </Box>

        <Box style={{ marginTop: "150px" }}>
          <table>
            <tbody>
              {resultFromDb.map((x, i) => (
                <tr key={{ i }}>
                  <td
                    style={{
                      color: "green",
                      fontWeight: "bolder",
                    }}
                  >
                    RESULTS FOUND: {x.result.length}
                  </td>
                  <td style={{ width: "200px", margin: "10px" }}>
                    <EZ_Dropdown
                      valuefield="id"
                      label={"courses"}
                      displayField="fullName"
                      value={x.course}
                      data={[
                        {
                          id: "OOP",
                          fullName: "Object Oriented Programming",
                        },
                        {
                          id: "RDBMS",
                          fullName: "Relational Database Management",
                        },
                        {
                          id: "networking",
                          fullName: "Practical Networking",
                        },
                        {
                          id: "dataMining",
                          fullName: "Data Mining",
                        },
                      ]}
                    />
                  </td>
                  <td style={{ margin: "10px" }}>
                    Form Status:
                    <EZ_Switch
                      onChange={(e) => {
                        resultFromDb[i].isShowResult = e.target.checked;
                      }}
                      value={x.isShowResult}
                      checked={x.isShowResult}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Container>
    </>
  );
}
