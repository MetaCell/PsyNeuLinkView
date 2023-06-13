import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import vars from "../../assets/styles/variables";
const {
  breadcrumbTextColor,
} = vars;

export const CustomSelect = ({state, setState, getMenuItems}) => {

  const onSelectChange = (event) => {
    setState({condaEnv: event.target.value})
  }
  return <FormControl
    fullWidth
    sx={{
      background: '#F4F4F4',
      borderRadius: '8px',
      "& .MuiInputLabel-root": {
        transition: 'none',
        position: 'absolute',
        top: '50%',
        left: '13px',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: 1,
        fontSize: '14px',
        color: '#1A1A1A',
        fontWeight:400,

        "&.Mui-focused": {
          color: '#8F8F8F'
        }
      },

      "& .MuiInputLabel-shrink":  {
        transform: 'translateY(-150%)',
        fontSize: '10px',
        color: '#8F8F8F'
      },
    }}>
    <InputLabel id="conda-environment-select-label">Conda environment</InputLabel>
    <Select
      labelId="conda-environment-select-label"
      id="conda-environment-select"
      value={state.condaEnv}
      label="Conda environment"
      onChange={onSelectChange}
      renderValue={(selected) => selected}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: 0
        },
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: 0
          }
        },
        color: breadcrumbTextColor,
        "& .MuiInput-input": {
          paddingLeft: '17px'
        },
        "&:before, &:after": {
          border: "none",
        },
        "&:hover:not(.Mui-disabled, .Mui-error)": {
          "&:before": {
            border: "none"
          },
        },
      }}
    >
      {getMenuItems()}
    </Select>
  </FormControl>
}
