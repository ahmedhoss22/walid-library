import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import logo from "../images/logo.png"
import { useFormik } from 'formik'
import Api, { handleApiError } from '../config/api'
import { notifySuccess } from '../utilities/toastify'
import { useNavigate } from "react-router-dom"
import { useDispatch ,useSelector } from "react-redux"
import { login } from '../redux/slices/user.slice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function handleSubmit(values) {
    try {
      await Api.post("/auth/login", values)
      notifySuccess("مرحبا")
      dispatch(login())
      navigate("/")
    } catch (error) {
      let err = error
      // console.log(err);
      handleApiError(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: handleSubmit
  })
  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} sx={{ padding: "0 32px", gap: { lg: "5rem", md: "4rem" }, marginTop: "1rem" }}>
        <img src={logo} alt='logo' placeholder='Logo' width="180px" height="80px" />
      </Stack >
      <Container gap={2} sx={{ width: "500px", border: "1px solid #fff", borderRadius: "1rem", direction: "rtl", padding: "1rem", marginTop: "3rem" }}>
        <Typography sx={{ marginBottom: "2rem" }} variant='h4' color="#fff" textAlign={"center"}>تسجيل الدخول</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction={"column"} gap={3} sx={{ direction: "rtl" }}>
            <TextField variant='outlined' name='username' label="اسم المستخدم" value={formik.values.username} onChange={formik.handleChange} />
            <TextField type='password' variant='outlined' name='password' label="كلمة السر" value={formik.values.password} onChange={formik.handleChange} />
            <Button type='submit' variant='contained' color='secondary' sx={{ color: "#fff" }}>تسجيل الدخول</Button>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default Login