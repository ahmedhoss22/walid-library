import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Card, CardContent, CardMedia, Container, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import teacher from "../images/teacher.png"
import EastIcon from '@mui/icons-material/East';
import AddTeacher from '../components/AddTeacher';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherData } from '../redux/slices/teacher.slice';
import { apiUrl } from '../config/api';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import Slider from "react-slick";
import Navbar from '../components/Navbar';

const Home = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "5px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 3
  };

  const teachers = useSelector((state) => state.teacher.data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTeacherData())
  }, [])

  const [search, setSearch] = useState("")
  let filterData = teachers
  if (search) {
    filterData = filterData.filter((ele) => ele?.name?.includes(search))
  }

  const navigate = useNavigate()

  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Navbar />
      <FormControl sx={{ flexGrow: 1, display: "block", width: "100%" }}>
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
            margin: "10px",
            letterSpacing: "2px",
            borderRadius: "1rem",
            justifyContent: "center"
          }}
          placeholder='Search'
          value={search} onChange={(e) => setSearch(e.target.value)} />
      </FormControl>
      <Grid container spacing={2} sx={{ marginTop: ".5rem", }}>
        {filterData.map((ele) => (
          <Grid sx={{ cursor: "pointer", transition: ".4s", '&:hover': { transform: 'translateY(-4px)' } }} onClick={() => navigate("/teacher-content/" + ele?._id)} key={ele._id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column", color: "#fff", maxWidth: 345, backgroundColor: "unset", boxShadow: ' 0 0 10px 1px rgba(255,255,255,0.5)' }} >
              <img className='d-block m-auto' src={apiUrl + ele?.image} alt='teacher' style={{ borderRadius: "50%", padding: "10px" }} width="150px" height="150px" />
              <p style={{
                textAlign: "center", margin: "10px 0", color: "white",
                textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"
              }}>{ele.name}</p>
              <div style={{ width: "100%", display: "flex", justifyContent: "end", padding: "0 30px 10px" }}>
                <EastIcon color='#fff' />
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddTeacher />
    </Container>
  );
};
export default Home;
