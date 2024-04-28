import { OutlinedInput, TextField } from '@mui/material';
import React from 'react';

const InputField = (props) => {
  return (
    <TextField
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff !important',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff !important',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff !important',
        },
        '& .MuiInputLabel-root': {
          color: '#fff',
        },
        '& .MuiInputBase-input': {
          color: '#fff',
        },
        color: "#fff",
        height: "60px",
        margin: "5px",
        letterSpacing: "2px",
        borderRadius: ".8rem",
        direction: "rtl",
      }}
      {...props}
    />
  )
}

export default InputField
