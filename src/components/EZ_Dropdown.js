import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function EZ_Dropdown(props) {
  const { label, value, onChange, data } = props;
  return (
    <>
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          variant="standard"
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          onChange={onChange}
        >
          {data && data.length > 0
            ? data.map((x, index) => (
                <MenuItem key={index} value={x.id}>
                  {x.displayName}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}
