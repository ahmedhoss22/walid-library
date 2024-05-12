import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import logo from "../images/logo.png";
import { useFormik } from "formik";
import calc from "../images/calc.png";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  makeStyles,
} from "@mui/material";
import InputField from "../components/InputField";
import Api, { apiUrl, handleApiError } from "../config/api";
import { notifyError, notifySuccess } from "../utilities/toastify";
import { getTeacherData } from "../redux/slices/teacher.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherPdf } from "../redux/slices/pdf.slice";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"; 
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useReactToPrint } from "react-to-print";
import { getPrints } from "../redux/slices/print.slice";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 600,
  margin: "auto",
  bgcolor: "#1D2D3C",
  color: "#fff",
  border: "2px solid #FCBB43",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const Balance = () => { 
 
  const viewerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, year } = useParams();
  const [teacher, setTeacher] = useState();
  const teachers = useSelector((state) => state.teacher.data);
  const teacherPrintedpdf = useSelector((state) => state.print.data);
  const [isOpenTable1, setIsOpenTable1] = useState(false);
  const [teacherPrintedPdf, setTeacherPrintedPdf] = useState([]);

 

  const handlePrint = useReactToPrint({
    content: () => viewerRef.current,
  });
 

  useEffect(() => {
    dispatch(getPrints())
  }, [id]);
  
  useEffect(() => {
    let printedpdf = teacherPrintedpdf.find((ele) => ele?.teacher == id);
    setTeacherPrintedPdf(printedpdf);
  }, [teacherPrintedPdf]);
  
  console.log(teacherPrintedPdf);

  // useEffect(() => {
  //   let pdf = teacherpdf.find((ele) => ele._id == id);
  //   setTeacherPdf(teacherpdf);
  // }, [id]);

  const toggleTable1 = () => {
    setIsOpenTable1(!isOpenTable1);
  };
  

  const formik = useFormik({
    initialValues: {
      payment: 0,
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    const payment = values.payment; 
    Api.post("/teacher/payment", { teacher: id, payment })
      .then(() => {
        notifySuccess("تم سداد المبلغ  ");
        formik.resetForm();
      })
      .catch((error) => {
        handleApiError(error);
      });
  }

  useEffect(() => {
    dispatch(getTeacherData(id));
    let user = teachers.find((ele) => ele._id == id);
    setTeacher(user);
  }, []);

  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Stack
          sx={{ justifyContent: "center", alignItems: "center", gap: "1.5rem" }}
          direction={"row-reverse"}
        >
          <img
            className="d-block m-auto "
            src={apiUrl + teacher?.image}
            style={{ borderRadius: "50%", cursor: "pointer" }}
            width="80px"
            onClick={() => navigate("/teacher-content/" + teacher?._id)}
            height="80px"
          />
          <h3
            style={{
              color: "#fff",
              color: "white",
              textShadow:
                "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43",
            }}
          >
            {teacher?.name}
          </h3>
          <KeyboardBackspaceIcon
            sx={{ color: "#fff", fontSize: "3rem", cursor: "pointer" }}
            onClick={() => navigate(`/teacher-content/` + id)}
          />
        </Stack>
        <img
          src={logo}
          placeholder="Logo"
          width="180px"
          height="90px"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Stack>
      <Box sx={style}>
        <h2
          style={{
            direction: "rtl",
            textAlign: "center",
            color: "white",
            textShadow:
              "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43",
          }}
        >
          الحسابات
        </h2>
        <Stack direction="column" alignItems="center" justifyContent="center">
          <img src={calc} alt="calc" width="175px" height="175px" />

          {/* <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "#fff" , direction: "rtl" ,textAlign:"center" }}>طريقة الدفع</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={typeRadioBtn}
                      name="type"
                      onChange={e => setTypeRadioBtn(e.target.value)}
                      sx={{ flexDirection: "row", direction: "rtl" ,justifyContent:"space-evenly"}}
                    >
                      <FormControlLabel value={"أجل"} control={<Radio />} label="أجل" />
                      <FormControlLabel value={"كاش"} control={<Radio />} label="كاش" />
                    </RadioGroup>
                  </FormControl>
                </Grid> */}

          <h1
            className="text-center"
            style={{
              direction: "rtl",
              textAlign: "center",
              color: "white",
              textShadow:
                "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43",
            }}
          >
            {teacher?.type == "loan"
              ? `المطلوب سداده : ${teacher?.balance} `
              : ` الحساب الكلي : ${teacher?.balance} `}
          </h1>
          {/* <Grid item xs={12}>
                  <InputField  fullWidth required type='text' name="name" variant='outlined' label="الحساب الكلي"   />
                </Grid>  */}
          <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
              <InputField
                fullWidth
                required
                type="number"
                name="payment"
                value={formik.values?.payment}
                onChange={formik.handleChange}
                variant="outlined"
                label="المبلغ الذي تم سداده"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  background: "linear-gradient(to right, #FF1105, #FCBB43)",
                  fontWeight: 700,
                  marginLeft: "6px",
                }}
              >
                سداد مبلغ{" "}
              </Button>
            </Grid>
          </form>
        </Stack>
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <IconButton onClick={toggleTable1}>
          {isOpenTable1 ? (
            <KeyboardArrowUpIcon sx={{ color: "#FCBB43" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: "#FCBB43" }} />
          )}
        </IconButton>
        <h3
          style={{
            color: "#fff",
            color: "white",
            textAlign: "center",
            margin: "25px 0px",
            textShadow:
              "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43",
          }}
        >
          العمليات
        </h3>
      </div>

      <Button
        variant="contained"
        onClick={handlePrint}
        type="button"
        sx={{
          background: "linear-gradient(to right, #FF1105, #FCBB43)",
          fontWeight: 700,
          marginBottom: "20px",
          marginLeft: "12px",
        }}
      >
        طباعة الجدول
      </Button>

      {isOpenTable1 && (
        <div ref={viewerRef}>
          <table
            style={{
              background: "#1D2D3C",
              margin: "10px",
              border: "2px solid #FCBB43",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th style={{ color: "white", textAlign: "center" }}>
                  التفاصيل
                </th>{" "}
                <th style={{ color: "white", textAlign: "center" }}>
                  تاريخ العملية
                </th>{" "}
                <th style={{ color: "white", textAlign: "center" }}>المبلغ</th>{" "}
                <th style={{ color: "white", textAlign: "center" }}>
                  نوع العملية
                </th>
              </tr>
            </thead>
            <tbody>
              {teacher?.transactions?.map((row) => (
                <tr key={row.name}>
                  <td style={{ color: "white", textAlign: "center" }}>
                    -
                  </td>{" "}
                  <td style={{ color: "white", textAlign: "center" }}>
                    {format(new Date(row?.createdAt), "dd/MM/yyyy")}
                  </td>{" "}
                  <td style={{ color: "white", textAlign: "center" }}>
                    {row?.amount}  : تم سداد 
                  </td>
                  <td style={{ color: "white", textAlign: "center" }}>
                   دفع
                  </td>
                </tr>
              ))}

{/* {teacherPdf.map((row) => (
                <tr key={row.name}>
                  <td style={{ color: "white", textAlign: "center" }}>
                  {row?.name}  : اسم المذكرة 
                  </td>{" "}
                  <td style={{ color: "white", textAlign: "center" }}>
                    {format(new Date(row?.createdAt), "dd/MM/yyyy")}
                  </td>{" "}
                  <td style={{ color: "white", textAlign: "center" }}>
                    {row?.oneCopyCost}  : سعر النسخة 
                  </td>
                  <td style={{ color: "white", textAlign: "center" }}>
                   طباعة
                  </td>
                </tr>
              ))} */}
              
            </tbody>
          </table>
        </div>
      )}

      {/* <div style={{    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>     <IconButton onClick={toggleTable2}>
        {isOpenTable2 ? <KeyboardArrowUpIcon  sx={{ color:'#FCBB43' }}/> : <KeyboardArrowDownIcon  sx={{ color:'#FCBB43' }} />}
      </IconButton> 
<h3
            style={{
              color: "#fff",
              color: "white",  
              textAlign:"center",
              margin:"25px 0px",
              textShadow:
                "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43",
            }}
          >
            الحسابات النسخة
          </h3>
      </div>
      
      {isOpenTable2 && (  

          <TableContainer component={Paper} dir="rtl" style={{   
    
          background: "#1D2D3C",
      margin:"10px",   
  border: "2px solid #FCBB43",}}>
      <Table  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow> 
            <TableCell align="center" style={{ color: 'white' ,    fontSize:'20px' }}>اسم اسم المذكرة</TableCell>
            <TableCell align="center" style={{ color: 'white' ,    fontSize:'20px' }}>       الحساب الكلي للنسخة</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {teacherPdf?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >  
            
              <TableCell align="center" style={{ color: 'white' ,    fontSize:'20px' }}>{row?.name}</TableCell>
              <TableCell align="center" style={{ color: 'white' ,    fontSize:'20px' }}>{row?.oneCopyCost}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
      )} */}
    </Container>
  );
};

export default Balance;
