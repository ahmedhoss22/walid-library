import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddPayment from "../components/AddPayment";
import { useDispatch, useSelector } from "react-redux";
import { getPrints } from "../redux/slices/print.slice";
import { getPdfs } from "../redux/slices/pdf.slice";
import { getTeacherData } from "../redux/slices/teacher.slice";
import { format } from "date-fns";

const Payments = () => {
  const [search, setSearch] = useState("");
  const prints = useSelector((state) => state.print.data)
  const pdfs = useSelector((state) => state.pdf.all)
  const teachers = useSelector((state) => state.teacher.data)

  const rows = [];
  const dispatch = useDispatch()
  const [modal, setModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  const handleClose = () =>
    setModal({ open: false, update: false, data: null });
  useEffect(() => {
    dispatch(getPrints())
    dispatch(getPdfs())
    dispatch(getTeacherData())
  }, [])

  function getPdf(id, field) {
    let temp = pdfs.find((ele) => ele._id == id)
    console.log(temp);
    return temp[field]
  }

  function getTeacherName(id) {
    let temp = teachers.find((ele) => ele._id == id)
    return temp?.name
  }

  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Navbar>
        <FormControl sx={{ flexGrow: 1 }}>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon color="secondary" />
              </InputAdornment>
            }
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              color: "#fff",
              height: "60px",
              margin: "15px",
              letterSpacing: "2px",
              borderRadius: "1rem",
            }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
        <input type="date" style={{ backgroundColor: "unset", border: "none", color: "#fff", height: "50px", margin: "auto" }} />
      </Navbar>
      <Button
        onClick={() => setModal({ open: true, update: false })}
        variant="contained"
        color="secondary"
        sx={{ marginY: 2, color: "#fff" }}
      >
        اضافة طباعة
      </Button>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "1rem", direction: "rtl" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">الاسم</TableCell>
              <TableCell align="center">عدد  النسخ</TableCell>
              <TableCell align="center">التكلفة</TableCell>
              <TableCell align="center">التاريح</TableCell>
              <TableCell align="center">الوقت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prints.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
              <TableCell align="center">{row?.type == "teacher" ? getTeacherName(row.teacher) : row?.name}</TableCell>
                <TableCell align="center">{row?.copies}</TableCell>
                <TableCell align="center">{row.cost}</TableCell>
                <TableCell align="center">{format(new Date(row?.createdAt), "dd-MM-yyyy")}</TableCell>
                <TableCell align="center">{format(new Date(row?.createdAt), "h-m")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddPayment open={modal.open} handleClose={handleClose} />
    </Container>
  );
};

export default Payments;
