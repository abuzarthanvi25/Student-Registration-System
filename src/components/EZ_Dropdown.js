import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getData } from "../config/firebasemethods";

export default function EZ_Dropdown(props) {
  const {
    label,
    value,
    onChange,
    data,
    displayField,
    valueField,
    disabled,
    nodeName,
    ref,
  } = props;

  let [dtSource, setDtSource] = useState(data);

  let getDataFromDB = () => {
    if (nodeName) {
      getData(nodeName)
        .then((res) => {
          setDtSource(res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);
  return (
    <>
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          ref={ref}
          defaultValue=""
          variant="outlined"
          fullWidth
          disabled={disabled}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          onChange={onChange}
        >
          {dtSource && dtSource.length > 0
            ? dtSource.map((x, index) => (
                <MenuItem key={index} value={x[valueField ? valueField : "id"]}>
                  {x[displayField ? displayField : "displayName"]}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}
