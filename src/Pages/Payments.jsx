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
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialoge from "../components/ConfirmationDialoge";

const Payments = () => { 
  const prints = useSelector((state) => state.print.data)
  const pdfs = useSelector((state) => state.pdf.all)
  const teachers = useSelector((state) => state.teacher.data)
  const [dialog, setDialoge] = useState({ open: false, id: "" });
  function handleCloseDialoge() {
    setDialoge({ open: false, id: "" });
  }  

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
     
    return temp[field]
  }
  function formatDateAndTime(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero indexed
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight
    const formattedTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + amPM;
    return `${day}-${month}-${year} ${formattedTime}`;
  }

  function getTeacherName(id) {
    let temp = teachers.find((ele) => ele._id == id)
     
    return temp?.name
  }
  const [search, setSearch] = useState("")
  let filterData = prints
  if (search) {
    filterData = filterData.filter((row) =>new Date(row.createdAt).toISOString().split('T')[0] === search)
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
            type="date"
          />
        </FormControl>
        {/* <input type="date" style={{ backgroundColor: "unset", border: "none", color: "#fff", height: "50px", margin: "auto" }} /> */}
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
        // sx={{ marginTop: "1rem",  ,marginBottom: "1rem"}}
        style={{
          background: "#1D2D3C",
          margin: "10px",
          border: "2px solid #FCBB43",
          width: "100%",direction: "rtl"
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
            }}>الاسم</TableCell>
              <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
            }}>عدد  النسخ</TableCell>
              <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
            }}>التكلفة</TableCell>
              <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
            }}>التاريح</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
              <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
            }}>{row?.teacher ? getTeacherName(row?.teacher) : 'عميل'}</TableCell>
                <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
            }}>{row?.copies}</TableCell>
                <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
            }}>{row.cost}</TableCell>
                <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
            }}>{formatDateAndTime(new Date(row?.createdAt))}</TableCell>
                
                {/* <TableCell align="center">{format(new Date(row?.createdAt), "yyyy / MM / dd")}</TableCell> */}
                {/* <TableCell align="center">{format(new Date(row?.createdAt), "a h:m ")}</TableCell> */}
               
            <DeleteIcon
                      style={{ color: "red", cursor: "pointer" ,textAlign: "center"}}
                      onClick={() => setDialoge({ open: true, id: row._id })}
                    /> 
              </TableRow>
            ))}
            <TableRow >
              <TableCell></TableCell>
              <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
              fontWeight:"700"
            }}>الاجمالي :</TableCell>
              <TableCell   style={{
              color: "white",
              fontSize: "16px",
              textAlign: "center",
              fontWeight:"700"
            }}>{filterData.reduce((prev,cur)=>prev+=cur.cost ,0)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <AddPayment open={modal.open} handleClose={handleClose} />
      <ConfirmationDialoge
      type={'payment'}
        open={dialog.open}
        handleClose={handleCloseDialoge}
        id={dialog.id}
      />
    </Container>
  );
};

export default Payments;
