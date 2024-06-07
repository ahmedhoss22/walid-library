import { Button, Container, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import logo from "../images/logo.png";
import { getTeacherData } from '../redux/slices/teacher.slice';
import { apiUrl } from '../config/api';

const TeacherContent = () => {
  const teachers = useSelector((state) => state.teacher.data);
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [teacher, setTeacher] = useState()

  useEffect(() => {
    dispatch(getTeacherData())
    let user = teachers.find((ele) => ele._id == id)
    setTeacher(user)
  }, [id]);


  return (
    <>
      <Container sx={{ marginTop: "1.5rem" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <KeyboardBackspaceIcon sx={{ color: "#fff", fontSize: "3rem", cursor: "pointer" }} onClick={() => navigate("/")} />
          <img src={logo} style={{cursor:"pointer"}} onClick={()=>navigate('/')} placeholder='Logo' width="180px" height="90px" />
        </Stack>
        <Stack sx={{ marginTop: "1.5rem", justifyContent: "center", alignItems: "center", gap: "1.5rem" }} direction={"row-reverse"}>
          <img className='d-block m-auto' src={apiUrl + teacher?.image}  style={{ borderRadius: "50%" }} width="100px" height="100px" />
          <h3 style={{ color: "#fff",color: "white",textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43" }}>{teacher?.name}</h3>
        </Stack>
        <Stack direction="row" sx={{ gap: "2rem", marginTop: "4rem" }}>
          <button onClick={() => navigate("/pdfs/" + id)} style={{ cursor: "pointer", "&:hover": { opicty: .7 }, flexGrow: 1, fontSize: "4rem", height: "200px", width: "200px", backgroundColor: "var(--secondary)", color: '#fff', border: "0", borderRadius: "6px" }}>
            المذكرات
          </button>
          <button onClick={() => navigate("/balance/"+id )} style={{ cursor: "pointer", "&:hover": { opicty: .7 }, flexGrow: 1, fontSize: "4rem", height: "200px", width: "200px", backgroundColor: "var(--secondary)", color: '#fff', border: "0", borderRadius: "6px" }}>
            الحسابات
          </button>
        </Stack>
      </Container>
    </>
  )
}

export default TeacherContent
