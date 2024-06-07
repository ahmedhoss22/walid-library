import { Box, Button, Card, CardMedia, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import logo from "../images/logo.png";
import { getTeacherData } from '../redux/slices/teacher.slice';
import { apiUrl } from '../config/api';
import SearchInput from '../components/SearchInput';
import DeleteIcon from '@mui/icons-material/Delete';
import book from "../images/book.png"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddPdf from '../components/AddPdf';
import { getTeacherPdf } from '../redux/slices/pdf.slice';
import ConfirmationDialoge from '../components/ConfirmationDialoge';
import AddTeacher from '../components/AddTeacher';

const Pdfs = () => {

  const teachers = useSelector((state) => state.teacher.data);
  const pdfs = useSelector((state) => state.pdf.data);


  const { id, year } = useParams();
  console.log(year);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [teacher, setTeacher] = useState()
  const [search, setSearch] = useState()

  useEffect(() => {
    dispatch(getTeacherPdf(id))
    let user = teachers.find((ele) => ele._id == id)
    setTeacher(user)
  }, [id]);

  const [dialog, setDialoge] = useState({ open: false, id: "" })

  function handleCloseDialoge() {
    setDialoge({ open: false, id: "" })
  }

  const [update, setUpdate] = useState({ open: false, data: {} })
  function handleCloseUpdate() {
    setUpdate({ open: false, data: {} })
  }

  let filterdData = pdfs
  if (search) {
    filterdData = filterdData?.filter((ele) => ele?.name?.includes(search) || ele?.year?.includes(search))
  }
  filterdData = filterdData?.filter((ele) => ele.year == year)







  return (
    <>
      <Container sx={{ marginTop: "1.5rem" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack sx={{ marginTop: "1.5rem", justifyContent: "center", alignItems: "center", gap: "1.5rem" }} direction={"row-reverse"}>
            <img className='d-block m-auto' src={apiUrl + teacher?.image} onClick={() => navigate('/teacher-content/' + teacher?._id)} style={{ borderRadius: "50%", cursor: "pointer" }} width="80px" height="80px" />
            <h3 style={{
              color: "#fff", color: "white",
              textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"
            }}>{teacher?.name}</h3>
          </Stack>
          <img src={logo} style={{ cursor: "pointer" }} onClick={() => navigate('/')} placeholder='Logo' width="180px" height="90px" />
        </Stack>
        <Stack direction="row" gap={2} sx={{ justifyContent: "center", alignItems: "center" }}>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button onClick={() => navigate(`/pdfs/${id}`)} color='secondary' sx={{ color: "secondary", fontWeight: "700", fontSize: "1.1rem", border: "1px solid #fff", height: "60px", borderRadius: "1rem" }} variant="outlined">السنة الدراسية</Button>
          <Button onClick={() => navigate("/")} color='secondary' sx={{ color: "secondary", fontWeight: "700", fontSize: "1.1rem", border: "1px solid #fff", height: "60px", borderRadius: "1rem" }} variant="outlined">الصفحة الرئيسية</Button>
        </Stack>
        {/* <Grid container spacing={2}>
          {filterdData?.map((ele) => (
            <Grid item xs={4} key={ele._id}>
              <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column", color: "#fff", maxWidth: 345, backgroundColor: "unset", boxShadow: ' 0 0 10px 1px rgba(255,255,255,0.5)' }} >
                <Stack direction={"row"} sx={{ padding: "5px", justifyContent: "space-between", width: "100% !important", flexGrow: "1" }}>
                  <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => setDialoge({ open: true, id: ele._id })} />
                  <Box sx={{ cursor: "pointer", height: "120px" }} onClick={() => setUpdate({ open: true, data: ele })}>
                    <img className='d-block m-auto' src={book}   width="100px" height="100px" />
                    <Typography fontSize="1rem" style={{ color: "var(--secondary)" }} variant='body2' sx={{ textAlign: "end", color: "secondary", transform: "translateY(-20px)" }}>تعديل <ModeEditOutlineIcon color='secondary' /></Typography>
                  </Box>
                  <div></div>
                </Stack>
                <Typography variant='h5' sx={{ margin: "5px 0", textDecoration: "1px solid primary" }}>{ele?.name}</Typography>
                <Typography variant='h6' sx={{ margin: "5px 0" }}>{ele?.year}</Typography>
                <Typography variant='h6' sx={{ margin: "5px 0" }}>أ /  {teacher?.name} </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", padding: " 0 1rem " }}>
                  <Button variant='contained' type='submit' sx={{ background: 'linear-gradient(to right, #FF1105, #FCBB43)', fontWeight: 700 }}>طباعة</Button>
                  // <Button variant='contained' type='submit' sx={{ background: 'linear-gradient(to right, #FF1105, #FCBB43)', fontWeight: 700 }}>معاينة</Button>
                </Stack>

                <div style={{ width: "100%", display: "flex", justifyContent: "end", padding: "0 30px 10px" }}>
                </div>
              </Card>
            </Grid>
          ))
          }
        </Grid> */}
        <AddPdf />
      </Container>

      <ConfirmationDialoge       type={'pdf'}
 open={dialog.open} handleClose={handleCloseDialoge} id={dialog.id} />
      <AddPdf update={update.open} data={update.data} handleCloseUpdate={handleCloseUpdate} />
    </>
  )
}

export default Pdfs
