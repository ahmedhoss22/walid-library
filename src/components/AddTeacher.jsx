import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import formIcon from "../images/formIcon.png"
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import InputField from './InputField';
import Api, { handleApiError } from '../config/api';
import { notifySuccess } from '../utilities/toastify';
import { getTeacherData } from '../redux/slices/teacher.slice';
import { useDispatch } from 'react-redux';
import "../css/select.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  bgcolor: '#1D2D3C',
  color: "#fff",
  border: '2px solid #FCBB43',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const AddTeacher = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      balance: "",
      type: ""
    },
    onSubmit: handleSubmit
  })

  //image upload
  const imgRef = useRef()
  const [image, setImage] = useState(null)
  function handleInputClick() {
    imgRef.current.click()
  }

  function handleImageUpload(e) {
    let image = e.target.files[0]
    setImage(image)
  }

  function handleSubmit(values) {
    if (image) {
      values.image = image
    }
    Api.post("/teacher", values, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
      .then(() => {
        notifySuccess("تم الاضافة")
        formik.resetForm()
        handleClose()
        dispatch(getTeacherData())

      })
      .catch((error) => {
        handleApiError(error)
      })
  }
  return (
    <>
      <div style={{
        position: "fixed", right: "5rem", bottom: "5rem", borderRadius: "10px",
        padding: "0px 5px",
        boxShadow: "0 1px 2px 0 rgb(6 7 0 / 1)",
        background: "#1D2D3C"
      }} onClick={handleOpen}>
        <AddIcon color="secondary" sx={{ fontSize: "3.5rem", cursor: "pointer", transition: ".4s", '&:hover': { transform: 'scale(1.2)', }, }} />
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2 style={{
            direction: "rtl", textAlign: "center", color: "white",
            textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"
          }}>اضافة مدرس</h2>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <img onClick={handleInputClick} src={image ? URL.createObjectURL(image) : formIcon} alt='formIcon' width="100px" height="100px" style={{ cursor: "pointer" }} />
            <input onChange={handleImageUpload} accept=".png, .jpg, .jpeg" type='file' ref={imgRef} style={{ display: "none" }} />
            <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
              <Stack direction="column" gap={2}>
                <InputField required type='text' name="name" variant='outlined' label="الأسم" value={formik.values.name} onChange={formik.handleChange} />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">نوع الحساب</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={formik.values.type}  label="نوع الحساب"  name='type'  onChange={formik.handleChange}  className="custom-select">
                    <MenuItem value={"loan"}>أجل</MenuItem>
                    <MenuItem value={"deposite"}>مقدم</MenuItem>
                  </Select>
                </FormControl>
                <InputField required type='number' name="balance" variant='outlined' label="الحساب" value={formik.values.balance} onChange={formik.handleChange} />
                <Button variant='contained' type='submit' sx={{ background: 'linear-gradient(to right, #FF1105, #FCBB43)', fontWeight: 700 }}>اضافة</Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default AddTeacher
