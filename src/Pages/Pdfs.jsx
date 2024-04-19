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

const Pdfs = () => {

  const teachers = useSelector((state) => state.teacher.data);
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [teacher, setTeacher] = useState()
  const [search, setSearch] = useState()

  useEffect(() => {
    dispatch(getTeacherData())
    let user = teachers.find((ele) => ele._id == id)
    setTeacher(user)
  }, [id]);

  return (
    <>
      <Container sx={{ marginTop: "1.5rem" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack sx={{ marginTop: "1.5rem", justifyContent: "center", alignItems: "center", gap: "1.5rem" }} direction={"row-reverse"}>
            <img className='d-block m-auto' src={apiUrl + teacher?.image} style={{ borderRadius: "50%" }} width="80px" height="80px" />
            <h3 style={{ color: "#fff", outline: "var(--secondary)" }}>{teacher?.name}</h3>
          </Stack>
          <img src={logo} placeholder='Logo' width="180px" height="90px" />
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button onClick={() => navigate("/")} color='secondary' sx={{ color: "secondary", fontWeight: "700", fontSize: "1.1rem", border: "1px solid #fff", height: "60px", borderRadius: "1rem" }} variant="outlined">الصفحة الرئيسية</Button>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column", color: "#fff", maxWidth: 345, backgroundColor: "unset", boxShadow: ' 0 0 10px 1px rgba(255,255,255,0.5)' }} >
              <Stack direction={"row"} sx={{ justifyContent: "space-between", width: "100% !important", flexGrow: "1" }}>
                <DeleteIcon />
                <Box sx={{ cursor: "pointer" }}>
                  <img className='d-block m-auto' src={book} style={{ borderRadius: "50%" }} width="100px" height="100px" />
                  <Typography fontSize="1rem" style={{ color: "var(--secondary)" }} variant='body2' sx={{ textAlign: "end", color: "secondary", transform: "translateY(-20px)" }}>تعديل <ModeEditOutlineIcon color='secondary' /></Typography>
                </Box>
                <div></div>
              </Stack>
              <Typography variant='h4'>اسم المك`رة </Typography>
              <Typography variant='h5'>اسم المك`رة </Typography>
              <Typography variant='h5'>اسم المك`رة </Typography>
              <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", padding: " 0 1rem " }}>
                <Button variant='contained' type='submit' sx={{ background: 'linear-gradient(to right, #FF1105, #FCBB43)', fontWeight: 700 }}>طباعة</Button>
                <Button variant='contained' type='submit' sx={{ background: 'linear-gradient(to right, #FF1105, #FCBB43)', fontWeight: 700 }}>معاينة</Button>
              </Stack>

              <div style={{ width: "100%", display: "flex", justifyContent: "end", padding: "0 30px 10px" }}>
              </div>
            </Card>
          </Grid>
        </Grid>
        <AddPdf/>
      </Container>
    </>
  )
}

export default Pdfs
