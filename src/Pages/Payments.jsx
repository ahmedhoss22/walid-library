import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Button, Container, FormControl, InputAdornment, OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Payments = () => {
  const [search, setSearch] = useState("")
  const rows = []

  return (
    <Container sx={{ marginTop: "1.5rem" }}>

      <Navbar >
        <FormControl sx={{ flexGrow: 1 }}>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><SearchIcon color='secondary' /></InputAdornment>}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              color: "#fff",
              height: "60px",
              margin: "15px",
              letterSpacing: "2px",
              borderRadius: "1rem"
            }}
            placeholder='Search'
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
      </Navbar>
      <Button variant='contained' color='secondary' sx={{ marginY: 2, color: "#fff" }}>
        اضافة طباعة
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: "1rem", direction: "rtl" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>الاسم</TableCell>
              <TableCell align="right">سعر الورقة</TableCell>
              <TableCell align="right">عدد الورق</TableCell>
              <TableCell align="right">التكلفة</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  )
}

export default Payments