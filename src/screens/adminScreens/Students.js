import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EZ_DataGrid from "../../components/EZ_DataGrid";
import { checkUser, getData } from "../../config/firebasemethods";

export default function Students() {
  const [studentList, setStudentList] = useState([]);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "table-header",
    },
    {
      field: "firstName",
      headerName: "First name",
      headerClassName: "table-header",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",

      headerClassName: "table-header",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      headerClassName: "table-header",
      type: "number",
      width: 110,
      editable: true,
    },

    {
      field: "fullName",
      headerName: "Full name",
      headerClassName: "table-header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "fatherName",
      headerName: "Father Name",
      headerClassName: "table-header",
      width: 110,
      editable: true,
    },
    {
      field: "cnic",
      headerName: "CNIC",
      headerClassName: "table-header",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "contact",
      headerName: "Contact",
      headerClassName: "table-header",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "section",
      headerName: "Section",
      headerClassName: "table-header",
      width: 110,
      editable: true,
    },
    {
      field: "course",
      headerName: "Course",
      headerClassName: "table-header",
      width: 110,
      editable: true,
    },
    {
      field: "isActive",
      headerName: "Is Active",
      headerClassName: "table-header",
      width: 110,
      editable: true,
    },
    {
      field: "registrationYear",
      headerName: "Registration Year",
      headerClassName: "table-header",
      width: 110,
      editable: true,
    },
    {
      field: "isFeesSubmitted",
      headerName: "Is Fees Submitted",
      headerClassName: "table-header",
      width: 110,
      editable: true,
    },
    {
      field: "isApproved",
      headerName: "Is Approved",
      headerClassName: "table-header",
      width: 110,
      editable: true,
    },
  ];

  let getStudents = () => {
    getData("studentsData/")
      .then((success) => {
        console.log(success);
        setStudentList(success);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  let isUser = () => {
    checkUser()
      .then((success) => {
        console.log(success);
        // alert(success);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        navigate("/");
      });
  };

  useEffect(() => {
    isUser();
    getStudents();
  }, []);

  return (
    <>
      <Typography
        textAlign={"center"}
        variant="h2"
        // color={"secondary"}
        style={{
          backgroundColor: "#005fa8",
          color: "white",
          borderRadius: "10px",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
        gutterBottom
        margin={"10px"}
        fontWeight="bolder"
      >
        Registered Students
      </Typography>
      <Container maxWidth="xl" style={{ padding: "20px" }}>
        {studentList && studentList.length > 0 ? (
          <EZ_DataGrid rows={studentList} columns={columns} />
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
