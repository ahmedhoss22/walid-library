import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import formIcon from "../images/book.png"
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, makeStyles } from '@mui/material';
import InputField from './InputField';
import Api, { handleApiError } from '../config/api';
import { notifyError, notifySuccess } from '../utilities/toastify';
import { getTeacherData } from '../redux/slices/teacher.slice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTeacherPdf } from '../redux/slices/pdf.slice';

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



const AddPdf = ({ update, data, handleCloseUpdate }) => {

  const imgRef = useRef()
  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState("")

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleCloseUpdate && handleCloseUpdate()
    setImageName("")
  }
  const [typeRadioBtn, setTypeRadioBtn] = useState("حلزوني")
  const dispatch = useDispatch()
  const { id } = useParams()


  const formik = useFormik({
    initialValues: update ? data : {
      name: "",
      pagesNo: "",
      paperCost: "",
      coverCost: "",
      type: "",
      year: "",
      paperPrint: "",
    },
    onSubmit: values => {
      if (update) {
        handleUpdate(values)
      } else {
        handleSubmit(values)
      }
    },
  })

  //image upload


  function handleInputClick() {
    imgRef.current.click()
  }

  function handleImageUpload(e) {
    let image = e.target.files[0]
    setImage(image)
    setImageName(e.target.value)
  }

  function handleSubmit(values) {
    if (!image) return notifyError("لم يتم رفع مذكرة ")
    if (image) {
      values.file = image
    }
    if (typeRadioBtn == "حلزوني") {
      values.type = "حلزوني"
    }
    values.teacher = id
    Api.post("/pdf", values, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
      .then(() => {
        notifySuccess("تم الاضافة")
        formik.resetForm()
        handleClose()
        dispatch(getTeacherPdf(id))

      })
      .catch((error) => {
        handleApiError(error)
      })
  }

  function handleUpdate(values) {
    if (typeRadioBtn == "حلزوني") {
      // values.type = "حلزوني"
    }
    if (image) {
      let temp = { ...values, file: image }
      values = temp
    }

    Api.patch("/pdf/" + data?._id, values, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
      .then(() => {
        notifySuccess("تم التعديل")
        formik.resetForm()
        handleClose()
        dispatch(getTeacherPdf(id))

      })
      .catch((error) => {
        console.log(error);
        handleApiError(error)
      })
  }

  useEffect(() => {
    if (update && data) {
      formik.setValues(data)
    }
  }, [data])
  return (
    <>
      <div style={{ position: "fixed", right: "5rem", bottom: "5rem"
      ,borderRadius: "10px",  
        padding: "0px 5px",  
        boxShadow: "0 1px 2px 0 rgb(6 7 0 / 1)"   ,
        background:"#1D2D3C"
     }} onClick={handleOpen}>
        <AddIcon color="secondary" sx={{ fontSize: "3.5rem", cursor: "pointer", transition: ".4s", '&:hover': { transform: 'scale(1.2)', }, }} />
      </div>

      <Modal open={open || update} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2  style={{ direction: "rtl", textAlign:'center' ,color: "white",
    textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"}}>{update ? "تعديل" : "اضافة"} مذكرة</h2>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <img onClick={handleInputClick} src={formIcon} alt='formIcon' width="100px" height="100px" style={{ cursor: "pointer" }} />
            <p>{imageName ? imageName : data?.name || "لا يوجد مذكرة"}</p>
            <input onChange={handleImageUpload} required accept=".pdf " type='file' ref={imgRef} style={{ display: "none" }} />
            <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "#fff", textAlign:"center" }}>النوع</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={typeRadioBtn}
                      name="type"
                      onChange={e => setTypeRadioBtn(e.target.value)}
                      sx={{ flexDirection: "row", direction: "rtl" , justifyContent:"space-evenly" }}
                    >
                      <FormControlLabel value={"حلزوني"} control={<Radio />} label="حلزوني" />
                      <FormControlLabel value={"other"} control={<Radio />} label="اخرى" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              <Grid spacing={2} container sx={{ direction: "rtl" }}>
                <Grid item xs={6}>
                  <InputField fullWidth required type='text' name="name" variant='outlined' label="الأسم" value={formik.values?.name} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <InputField required fullWidth type='number' name="pagesNo" variant='outlined' label="عدد الصفحات" value={formik.values?.pagesNo} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <InputField required fullWidth type='number' name="paperCost" variant='outlined' label="سعر الورقة" value={formik.values?.paperCost} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <InputField required fullWidth type='number' name="coverCost" variant='outlined' label="سعر التغليف" value={formik.values?.coverCost} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">السنة الدراسية</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values?.year}
                      required
                      label="السنة الدراسية"
                      name='year'
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="الصف الاول الابتدائي">الصف الاول الابتدائي</MenuItem>
                      <MenuItem value="الصف الثاني الابتدائي">الصف الثاني الابتدائي</MenuItem>
                      <MenuItem value="الصف الثالث الابتدائي">الصف الثالث الابتدائي</MenuItem>
                      <MenuItem value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</MenuItem>
                      <MenuItem value="الصف الخامس الابتدائي">الصف الخامس الابتدائي</MenuItem>
                      <MenuItem value="الصف السادس الابتدائي">الصف السادس الابتدائي</MenuItem>
                      <MenuItem value="الصف الاول الاعدادي">الصف الاول الاعدادي</MenuItem>
                      <MenuItem value="الصف الثاني الاعدادي">الصف الثاني الاعدادي</MenuItem>
                      <MenuItem value="الصف الثالث الاعدادي">الصف الثالث الاعدادي</MenuItem>
                      <MenuItem value="الصف الاول الثانوي">الصف الاول الثانوي</MenuItem>
                      <MenuItem value="الصف الثاني الثانوي">الصف الثاني الثانوي</MenuItem>
                      <MenuItem value="الصف الثالث الثانوي">الصف الثالث الثانوي</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "#fff" }} id="demo-simple-select-label">نوع التصوير</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values?.paperPrint}
                      // label="Age"
                      required
                      onChange={formik.handleChange}
                      name='paperPrint'

                    >
                      <MenuItem value="وش">وش</MenuItem>
                      <MenuItem value="وش و ظهر">وش و ظهر</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            
                {typeRadioBtn == "other" && <Grid item xs={6}>
                  <InputField fullWidth required type='text' name="type" variant='outlined' label="اخرى" value={formik.values?.type} onChange={formik.handleChange} />
                </Grid>}
                <Grid item xs={12}>
                  <Button fullWidth variant='contained' type='submit' sx={{ background: 'linear-gradient(to right, #FF1105, #FCBB43)', fontWeight: 700 }}>{update ? "تعديل" : "اضافة"}</Button>
                </Grid>
              </Grid>
            </form>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default AddPdf
