import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Api, { apiUrl } from "../config/api";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PDFDocument, rgb } from 'pdf-lib';
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import InputField from "./InputField";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#1D2D3C',
    color: "#fff",
    border: '2px solid #FCBB43',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
    height: 600,
    overflowY: "auto",
  };
const AddPayment = ({ open, handleClose }) => {
  const [typeRadioBtn, setTypeRadioBtn] = useState("حلزوني")
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues:   {
      name: "",
      pagesNo: "",
      paperCost: "",
      coverCost: "",
      type: "",
      year: "",
      paperPrint: "",
    },
    onSubmit: values => {
    
        handleSubmit(values)
    },
  })
  function handleSubmit(values) {
    // if (!image) return notifyError("لم يتم رفع مذكرة ")
    // if (image) {
    //   values.file = image
    // }
    // if (typeRadioBtn == "حلزوني") {
    //   values.type = "حلزوني"
    // }
    // values.teacher = id
    // Api.post("/pdf", values, {
    //   headers: {
    //     'Content-Type': "multipart/form-data"
    //   }
    // })
    //   .then(() => {
    //     notifySuccess("تم الاضافة")
    //     formik.resetForm()
    //     handleClose()
    //     dispatch(getTeacherPdf(id))

    //   })
    //   .catch((error) => {
    //     handleApiError(error)
    //   })
  }
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <h2  style={{ direction: "rtl", textAlign:'center' ,color: "white",
    textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"}}>اضافة طباعة </h2>
         <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
                  <FormControl fullWidth>
                     <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={typeRadioBtn}
                      name="type"
                      onChange={e => setTypeRadioBtn(e.target.value)}
                      sx={{ flexDirection: "row", direction: "rtl" , justifyContent:"space-evenly" }}
                    >
                      <FormControlLabel value={"عميل"} control={<Radio />} label="عميل" />
                      <FormControlLabel value={"other"} control={<Radio />} label="مدرس" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              <Grid spacing={2} container sx={{ direction: "rtl" }}>
         <Grid item xs={6}>
                  <InputField fullWidth required type='text' name="name" variant='outlined' label="سعر الورقة" value={formik.values?.name} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <InputField required fullWidth type='number' name="pagesNo" variant='outlined' label="عدد الورق" value={formik.values?.pagesNo} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <InputField required fullWidth type='number' name="paperCost" variant='outlined' label="عدد النسخ" value={formik.values?.paperCost} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <InputField required fullWidth type='number' name="coverCost" variant='outlined' label="سعر التغليف" value={formik.values?.coverCost} onChange={formik.handleChange} />
                </Grid> 
      
          
                {typeRadioBtn == "other" && <Grid item xs={12}>
                  <InputField fullWidth required type='text' name="type" variant='outlined' label="اسم المدرس" value={formik.values?.type} onChange={formik.handleChange} />
                </Grid>}
                {typeRadioBtn == "other" && <Grid item xs={12}>
                  <InputField fullWidth required type='text' name="type" variant='outlined' label="المذكرات" value={formik.values?.type} onChange={formik.handleChange} />
                </Grid>}
                <Grid item xs={12}>
                </Grid>
              </Grid>
            </form>
      <Button 
        variant="contained"
        type="submit"
        style={{ position: "fixed", bottom: "30px", right: "50px" }}
        sx={{
          background: "linear-gradient(to right, #FF1105, #FCBB43)",
          fontWeight: 700,
          marginBottom: "20px",
        }}
      >
        اضافة طباعة
      </Button>
      <Button
        onClick={handleClose}
        variant="contained"
        type="submit"
        style={{ position: "fixed", bottom: "30px", left: "50px" }}
        sx={{
          background: "linear-gradient(to right, #FF1105, #FCBB43)",
          fontWeight: 700,
          marginBottom: "20px",
        }}
      >
        اغلاق
      </Button>
    </Box>
  </Modal>
  )
}

export default AddPayment
