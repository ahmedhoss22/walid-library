import React, { useEffect, useState } from 'react'
import AddPdf from '../components/AddPdf'
import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import logo from "../images/logo.png";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherPdf } from '../redux/slices/pdf.slice';

const Year = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch()
  const pdfs = useSelector((state) => state.pdf.data);
  const [years, setYears] = useState([])
  console.log(years);

  useEffect(() => {
    dispatch(getTeacherPdf(id))
  }, [id]);
  useEffect(() => {
    const uniqueYears = new Set();

    pdfs?.forEach((pdf) => {
      uniqueYears.add(pdf?.year);
    });
    const uniqueYearsArray = Array.from(uniqueYears);
    setYears(uniqueYearsArray)

  }, [pdfs])


  return (
    <>
      <Container sx={{ marginTop: "1.5rem" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <KeyboardBackspaceIcon sx={{ color: "#fff", fontSize: "3rem", cursor: "pointer" }} onClick={() => navigate("/")} />
          <img src={logo} style={{cursor:"pointer"}} onClick={()=>navigate('/teacher-content/'+id)} placeholder='Logo' width="180px" height="90px" />
        </Stack>
        <Typography variant='h3' sx={{ textAlign: "center", color: "white",
    textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"}}>السنة الدراسية</Typography>
        <Grid container spacing={2} sx={{ marginTop: "2rem", justifyContent: "center" ,textAlign:"center" }}>
          {years.map((year) => (
            <Grid item xs={3}>
              <Button onClick={() => navigate(`/pdfs/${id}/${year}`)} variant='contained' sx={{ color: "#fff", fontSize: "1.5rem" }} color='secondary'>{year}</Button>
            </Grid>
          ))
          }
        </Grid>
        <AddPdf />
      </Container>
    </>
  )
}

export default Year