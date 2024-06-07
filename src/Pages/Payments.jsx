import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, FormControl, Stack } from "@mui/material";
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import "../css/prints.css"

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

  const [search, setSearch] = useState(dayjs())
  let filterData = prints
  if (search) {
    const formattedSearch = search.format('YYYY-MM-DD');
    filterData = filterData.filter(
      (row) => new Date(row.createdAt).toISOString().split('T')[0] === formattedSearch
    );
  }

  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Navbar/>
      <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"} >
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="التاريخ"
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#fff', // Text color
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#fff', // Border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#fff', // Border color on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#fff', // Border color when focused
                    },
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#fff', // Icon color
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff', // Label color
                  },
                }}
                value={search}
                onChange={(newValue) => setSearch(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
        <Button onClick={() => setModal({ open: true, update: false })} variant="contained" color="secondary" sx={{ marginY: 2, color: "#fff", width: "120px" }}>
          اضافة طباعة
        </Button>
      </Stack>
      <TableContainer
        component={Paper}
        // sx={{ marginTop: "1rem",  ,marginBottom: "1rem"}}
        style={{
          background: "#1D2D3C",
          margin: "10px",
          border: "2px solid #FCBB43",
          width: "100%", direction: "rtl"
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table-cell" style={{textAlign:"center"}}>الاسم</TableCell>
              <TableCell className="table-cell" style={{textAlign:"center"}}>عدد النسخ</TableCell>
              <TableCell className="table-cell" style={{textAlign:"center"}}>التكلفة</TableCell>
              <TableCell className="table-cell" style={{textAlign:"center"}}>التاريخ</TableCell>
              <TableCell className="table-cell" style={{textAlign:"center"}}>حذف</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell className="table-cell" style={{textAlign:"center"}}>{row?.teacher ? getTeacherName(row?.teacher) : 'عميل'}</TableCell>
                <TableCell className="table-cell" style={{textAlign:"center"}}>{row?.copies}</TableCell>
                <TableCell className="table-cell" style={{textAlign:"center"}}>{row.cost}</TableCell>
                <TableCell className="table-cell" style={{textAlign:"center"}}>{formatDateAndTime(new Date(row?.createdAt))}</TableCell>
                <TableCell className="table-cell" style={{textAlign:"center"}}>  <DeleteIcon style={{ color: "red", cursor: "pointer", textAlign: "center" }} onClick={() => setDialoge({ open: true, id: row._id })} /></TableCell>
              </TableRow>
            ))}
            <TableRow >
              <TableCell></TableCell>
              <TableCell className="table-cell" style={{ fontWeight: "700" ,textAlign:"center"}}>الاجمالي :</TableCell>
              <TableCell className="table-cell" style={{ fontWeight: "700" ,textAlign:"center"}}>{filterData.reduce((prev, cur) => prev += cur.cost, 0)}</TableCell>
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
