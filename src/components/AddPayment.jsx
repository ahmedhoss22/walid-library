import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Api, { apiUrl, handleApiError } from "../config/api";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PDFDocument, rgb } from 'pdf-lib';
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import InputField from "./InputField";
import { getTeacherData } from "../redux/slices/teacher.slice";
import { getPdfs } from "../redux/slices/pdf.slice";
import { notifySuccess } from "../utilities/toastify";
import { getPrints } from "../redux/slices/print.slice";

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
  const dispatch = useDispatch()
  const teachers = useSelector((state) => state.teacher.data)
  const pdf = useSelector((state) => state.pdf.all)
  const [displayedPdf, setDisplayedPdf] = useState([])
  const disptach = useDispatch()

  React.useEffect(() => {
    dispatch(getTeacherData())
    dispatch(getPdfs())
  }, [])

  const formik = useFormik({
    initialValues: {
      teacher: "",
      pdf: "",
      type: "client",
      copies: "",
      pagesNo: "",
      paperCost: "",
      coverCost: "",
      // paperPrint: "",
      // name: "",
      // year: "",
    },
    onSubmit:handleSubmit,
  })

  React.useEffect(() => {
    if (formik.values.teacher) { 
      const temp = pdf.filter((ele) => ele?.teacher?._id == formik.values.teacher)
      setDisplayedPdf(temp)
    }
  }, [pdf, formik.values.teacher])


  function handleSubmit(values) {
    const url = values.type == "client" ? "/prints/customer" :"/prints" 
    if (values.type === "client") {
      delete values.pdf;
      delete values.teacher;
    }
    console.log(values)
    Api.post(url, values)
      .then(() => {
        notifySuccess("تم الاضافة")
        formik.resetForm()
        handleClose()
        dispatch(getPrints())

      })
      .catch((error) => {
        handleApiError(error)
      })
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <h2 style={{
          direction: "rtl", textAlign: 'center', color: "white",
          textShadow: "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43"
        }}>اضافة طباعة </h2>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <RadioGroup aria-labelledby="demo-radio-buttons-group-label" value={formik.values.type} name="type" onChange={formik.handleChange} sx={{ flexDirection: "row", direction: "rtl", justifyContent: "space-evenly" }}>
                <FormControlLabel value={"client"} control={<Radio />} label="عميل" />
                <FormControlLabel value={"teacher"} control={<Radio />} label="مدرس" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid spacing={2} container sx={{ direction: "rtl" }}>
            {formik.values.type == "client" && <>
              <Grid item xs={12}>
                <InputField fullWidth required type='number' name="paperCost" variant='outlined' label="سعر الورقة" value={formik.values?.paperCost} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <InputField required fullWidth type='number' name="pagesNo" variant='outlined' label="عدد الورق" value={formik.values?.pagesNo} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <InputField required fullWidth type='number' name="coverCost" variant='outlined' label="سعر التغليف" value={formik.values?.coverCost} onChange={formik.handleChange} />
              </Grid>
            </>}


            {formik.values.type == "teacher" &&
              <>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">اسم المدرس</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values?.teacher}
                      label="اسم المدرس"
                      name="teacher"
                      onChange={formik.handleChange}
                      required
                    >
                      {teachers.map((ele) => (
                        <MenuItem value={ele?._id}>{ele?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {formik.values.teacher && <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">المذكرة</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values?.pdf}
                      label="المذكرة"
                      name="pdf"
                      onChange={formik.handleChange}
                      required
                    >
                      {displayedPdf.map((ele) => (
                        <MenuItem value={ele?._id}>{ele?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>}
              </>
            }
            <Grid item xs={12}>
              <InputField required fullWidth type='number' name="copies" variant='outlined' label="عدد النسخ" value={formik.values?.copies} onChange={formik.handleChange} />
            </Grid>
          </Grid>
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
        </form>
      </Box>
    </Modal>
  )
}

export default AddPayment
