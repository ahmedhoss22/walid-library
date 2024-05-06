import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Card, CardContent, CardMedia, Container, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../images/logo.png"
import teacher from "../images/teacher.png"
import EastIcon from '@mui/icons-material/East';
import AddTeacher from '../components/AddTeacher';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherData } from '../redux/slices/teacher.slice';
import { apiUrl } from '../config/api';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import Slider from "react-slick";
   
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

  const teachers = useSelector((state)=>state.teacher.data)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getTeacherData())
  },[])

  const [search, setSearch] = useState("")
  let filterData = teachers
  if (search) {
    filterData = filterData.filter((ele) => ele?.name?.includes(search))
  }

  const navigate = useNavigate()

  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Stack direction="row" sx={{ gap: { lg: "5rem", md: "4rem" } }}>
        <FormControl sx={{ flexGrow: 1 }}>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)}/>
        </FormControl>
        <img src={logo}  placeholder='Logo' width="180px" height="90px" />
      </Stack>
      {/* <Grid container spacing={2} sx={{ marginTop: 4 }}> */}
      <div className="slider-container">
      
    <Slider {...settings}>
        {filterData.map((ele) => (
          <div style={{margin:"30px " , padding:"20px"}}>
        <Grid onClick={()=>navigate("/teacher-content/" + ele?._id)} key={ele._id} item xs={3} sx={{ margin:"15px", cursor: "pointer", transition: ".4s", '&:hover': { transform: 'translateY(-4px)' } }}>
            <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column", color: "#fff", maxWidth: 345, backgroundColor: "unset", boxShadow: ' 0 0 10px 1px rgba(255,255,255,0.5)' }} >
              <img className='d-block m-auto' src={apiUrl+ele?.image} style={{ borderRadius: "50%" ,padding:"10px" }} width="150px" height="150px"/>
              <p style={{ textAlign: "center", margin: "10px 0" ,color: "white",
    textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"}}>{ele.name}</p>
              <div style={{ width: "100%", display: "flex", justifyContent: "end", padding: "0 30px 10px" }}>
                <EastIcon color='#fff' />
              </div>
            </Card>
          </Grid>
        </div>
    
  ))}
  </Slider>
  </div>

      {/* </Grid> */}
      <AddTeacher />
    </Container>
  );
};

export default Home;
