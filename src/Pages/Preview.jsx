// import React, { useEffect, useRef, useState } from 'react'
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import logo from "../images/logo.png";
// import { useFormik } from 'formik';
// import book from "../images/book.png"
// import { Container, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, makeStyles } from '@mui/material';
// import InputField from '../components/InputField';
// import Api, { apiUrl, handleApiError } from '../config/api';
// import { notifyError, notifySuccess } from '../utilities/toastify';
// import { getTeacherData } from '../redux/slices/teacher.slice';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getTeacherPdf } from '../redux/slices/pdf.slice';
// import { IoClose } from "react-icons/io5";
// import { LuEqual } from "react-icons/lu";
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css'; 

// const style = {
//   display:'flex',
//   flexDirection:'column',
//   justifyContent:'center',
//   alignItems:'center',  
//     width: 600,
//     margin:"auto",
//     bgcolor: '#1D2D3C',
//     color: "#fff",
//     border: '2px solid #FCBB43',
//     boxShadow: 24,
//     borderRadius: 5,
//     p: 4,
//   };

// const Preview = () => {
//   const teachers = useSelector((state) => state.teacher.data);
//   const [typeRadioBtn, setTypeRadioBtn] = useState("تجليد بشر")
//   const [teacher, setTeacher] = useState()
//   const { id, year,src } = useParams();
//   const dispatch = useDispatch()
//   const navigate =useNavigate()  
//   const pdfs = useSelector((state) => state.pdf.data);
//   const [years, setYears] = useState([])

//   useEffect(() => {
//     dispatch(getTeacherPdf(id))
//   }, [id]);
//   useEffect(() => {
//     const uniqueYears = new Set();

//     pdfs.forEach((pdf) => {
//       uniqueYears.add(pdf?.year);
//       console.log(pdf?.year);
//     });    
//     const uniqueYearsArray = Array.from(uniqueYears);
//     setYears(uniqueYearsArray)

//   }, [pdfs]) 


//   useEffect(() => {
//     dispatch(getTeacherPdf(id))
//     let user = teachers.find((ele) => ele?._id == id)
//     setTeacher(user)
//   }, [id]);
//   console.log(teacher);

//   return (
//     <Container sx={{ marginTop: "1.5rem" }}>
      

      
//              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
//           <Stack sx={{   justifyContent: "center", alignItems: "center", gap: "1.5rem" }} direction={"row-reverse"}>

//             <img className='d-block m-auto ' src={apiUrl + teacher?.image} style={{ borderRadius: "50%" ,cursor:"pointer"}} width="80px" onClick={()=>navigate('/teacher-content/'+teacher?._id)} height="80px" />
//             <h3 style={{ color: "#fff", color: "white",
//     textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43" }}>{teacher?.name}</h3>
//     <KeyboardBackspaceIcon sx={{ color: "#fff", fontSize: "3rem", cursor: "pointer" }} onClick={() => navigate(`/pdfs/${id}/${year}`)} />
//           </Stack>
//           <img src={logo} placeholder='Logo' width="180px" height="90px" style={{cursor:"pointer"}} onClick={()=>navigate('/')} />
//         </Stack>      

      
//                 {/* <Box sx={style}  >
                
//           <Stack direction="column" alignItems="center" justifyContent="center">
//             <img   src={book} alt='book' width="100px" height="100px"   />
//             <h2 style={{
//     direction: "rtl",
//     textAlign: 'center',
//     color: "white",
//     textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"
// }}>
//     اسم المذكرة
// </h2>
//              <form  style={{ marginTop: "1rem" }}>
//              <Grid item xs={6}>
//                   <FormControl fullWidth>
//                     <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "#fff" , direction: "rtl" ,textAlign:"center" }}>نوع التقفيل</FormLabel>
//                     <RadioGroup
//                       aria-labelledby="demo-radio-buttons-group-label"
//                       value={typeRadioBtn}
//                       name="type"
//                       onChange={e => setTypeRadioBtn(e.target.value)}
//                       sx={{ flexDirection: "row", direction: "rtl" ,justifyContent:"space-evenly"}}
//                     >
//                       <FormControlLabel value={"تجليد بشر"} control={<Radio />} label="تجليد بشر" />
//                       <FormControlLabel value={"other"} control={<Radio />} label="أخري" />
//                     </RadioGroup>
//                   </FormControl>
//                 </Grid>
//               <Grid spacing={2} container sx={{ direction: "rtl" }}>
//                 <Grid item xs={6}>
//                   <InputField  fullWidth required type='text' name="name" variant='outlined' label="سعر الورقة"   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <InputField  fullWidth required type='text' name="name" variant='outlined' label="طباعة الورقة"   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <InputField  fullWidth required type='text' name="name" variant='outlined' label="عدد النسخ"   />
//                 </Grid>
//                     <Grid item xs={3}>
//                    <InputField  fullWidth required type='text' name="name" variant='outlined' label="عدد النسخ"   />
//                 </Grid>
//                 <Grid item xs={1}style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '40px',
//                       color:"#FCBB43"

//                 }}> 
//                     <IoClose /> 
//                  </Grid>
//                 <Grid item xs={3}>
//                   <InputField  fullWidth required type='text' name="name" variant='outlined' label="عدد النسخ"   />
//                 </Grid>
//                 <Grid item xs={1} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '40px',
//                       color:"#FCBB43"
//                 }}> 
//                     <LuEqual    />
//                  </Grid>
//                 <Grid item xs={4}>
//                   <InputField  fullWidth required type='text' name="name" variant='outlined' label="عدد النسخ"   />
//                 </Grid>
                
//                 <Grid item xs={12}>
//                   <Button fullWidth variant='contained' type='submit' sx={{ background: 'linear-gradient(to right, #FF1105, #FCBB43)', fontWeight: 700 }}>طباعة</Button>
//                 </Grid>

             
//               </Grid>
//             </form>
//           </Stack> 
//         </Box> */}
      
//         </Container>
//   )
// }

// export default Preview
