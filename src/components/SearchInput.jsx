import { InputAdornment, OutlinedInput } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = (props) => {
  return (
    <OutlinedInput
      id="outlined-adornment-amount"
      startAdornment={<InputAdornment position="start"><SearchIcon color='secondary' /></InputAdornment>}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff',
        },
        color: "#fff",
        height: "60px",
        margin: "15px",
        letterSpacing: "2px",
        borderRadius: "1rem"
      }}
      placeholder='Search'
      {...props}
    />
  )
}

export default SearchInput
