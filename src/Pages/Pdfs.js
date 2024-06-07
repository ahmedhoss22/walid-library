import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import logo from "../images/logo.png";
import { getTeacherData } from "../redux/slices/teacher.slice";
import { apiUrl } from "../config/api";
import SearchInput from "../components/SearchInput";
import DeleteIcon from "@mui/icons-material/Delete";
import book from "../images/book.png";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AddPdf from "../components/AddPdf";
import { getTeacherPdf } from "../redux/slices/pdf.slice";
import ConfirmationDialoge from "../components/ConfirmationDialoge";
import AddTeacher from "../components/AddTeacher";
// import { ipcRenderer } from 'electron';
import Preview from "../components/Preview";
import CopyNumber from "../components/CopyNumber";
import Slider from "react-slick";
import { PDFDocument, rgb } from 'pdf-lib';
import teacher from "../images/teacher.png"
import { useFormik } from "formik";

const Pdfs = () => {
  const settings = { className: "center", centerMode: true, infinite: false, centerPadding: "5px", slidesToShow: 1, speed: 500, rows: 1, slidesPerRow: 3 };
  const teachers = useSelector((state) => state?.teacher?.data);
  const pdfs = useSelector((state) => state?.pdf?.data);
  const { id, year } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [years, setYears] = useState([])
  const [grades, setGrades] = useState([])

  const [teacher, setTeacher] = useState();
  useEffect(() => { dispatch(getTeacherData()) }, [])

  useEffect(() => {
    let user = teachers.find((ele) => ele?._id == id);
    setTeacher(user);
  }, [teachers])

  useEffect(() => {
    dispatch(getTeacherPdf(id));
  }, [id]);

  const [dialog, setDialoge] = useState({ open: false, id: "" });

  function handleCloseDialoge() {
    setDialoge({ open: false, id: "" });
  }

  const [update, setUpdate] = useState({ open: false, data: {} });
  function handleCloseUpdate() {
    setUpdate({ open: false, data: {} });
  }



  const [modal, setModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  const handleClose = () =>
    setModal({ open: false, update: false, data: null });

  const [copyModal, setCopyModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  const handleCloseCopy = () =>
    setCopyModal({ open: false, update: false, data: null });


  const adjustPDFContent = async (pdfUrl) => {
    // Load the PDF from the URL
    try {
      const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.setSize(width, height); // Adjust width
        // page.setRotation(0); // Remove or comment out this line
      });

      // Serialize the modified PDF
      return pdfDoc.save();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintPDF = async (pdfUrl) => {
    try {
      const adjustedPdfBytes = await adjustPDFContent(pdfUrl);
      const adjustedPdfBlob = new Blob([adjustedPdfBytes], { type: 'application/pdf' });
      const adjustedPdfUrl = URL.createObjectURL(adjustedPdfBlob);

      const printWindow = window.open(adjustedPdfUrl);

      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
          setTimeout(() => {
            setCopyModal({ open: true })
          }, 1000)

        };
      } else {
        console.error('Failed to open print window');
      }
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };

  useEffect(() => {
    let uniqueYears = new Set()
    let uniqueGrades = new Set()

    pdfs.forEach((ele) => {
      uniqueYears.add(ele?.year)
      uniqueGrades.add(ele?.grade)
    })

    const arrayYears = Array.from(uniqueYears)
    const arrayGrades = Array.from(uniqueGrades)

    setYears(arrayYears)
    setGrades(arrayGrades)

  }, [pdfs])

  const formik = useFormik({
    initialValues: {
      type: "",
      year: "",
      grade: "",
      semister: "",
      paperPrint: "",
      teacher: "",
    },
  })

  let filterdData = pdfs;
  if (search) {
    filterdData = filterdData?.filter(
      (ele) => ele?.name?.includes(search) ||
        ele?.year?.toString().includes(search) ||
        ele?.grade?.includes(search) ||
        ele?.type?.includes(search) ||
        ele?.printType?.includes(search)
    );
  }
  let { grade, type, year: yearFilter, semister } = formik.values
  if (grade) filterdData = filterdData.filter((ele) => ele?.grade?.includes(grade))
  if (type) filterdData = filterdData.filter((ele) => ele?.type?.includes(type))
  if (yearFilter) filterdData = filterdData.filter((ele) => ele?.year?.toString()?.includes(yearFilter))
  if (semister) filterdData = filterdData.filter((ele) => ele?.semister?.includes(semister))

  console.log(pdfs);
  return (
    <>
      <Container sx={{ marginTop: "1.5rem" }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Stack
            sx={{
              marginTop: "1.5rem",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
            }}
            direction={"row-reverse"}
          >

            <img
              className="d-block m-auto"
              src={apiUrl + teacher?.image}
              onClick={() => navigate("/teacher-content/" + teacher?._id)}
              style={{ borderRadius: "50%", cursor: "pointer" }}
              width="80px"
              height="80px"
              alt="pdf"
            />
            <h3
              style={{
                color: "#fff",
                color: "white",
                textShadow:
                  "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43",
              }}
            >
              {teacher?.name}
            </h3>
            <KeyboardBackspaceIcon sx={{ color: "#fff", fontSize: "3rem", cursor: "pointer" }} onClick={() => navigate("/teacher-content/" + id)} />
          </Stack>
          <img
            src={logo}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            placeholder="Logo"
            width="180px"
            height="90px"
            alt="pdf"
          />
        </Stack>
        <Stack
          direction="row"
          gap={2}
          sx={{ justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}
        >
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
          <FormControl sx={{ width: "170px", borderRadius: "1rem" }}>
            <InputLabel sx={{ color: "#fff", marginTop: "-0rem" }} id="demo-simple-select-label">السنة الدراسية</InputLabel>
            <Select
              sx={{ borderRadius: "1rem" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values?.grade}
              required
              onChange={formik.handleChange}
              name='grade'
              label="السنة الدراسية"
            >
              {grades.map((ele, ind) => (
                <MenuItem key={ind} value={ele}>{ele}</MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl sx={{ width: "150px", borderRadius: "1rem" }}>
            <InputLabel sx={{ color: "#fff", marginTop: "-0rem" }} id="year-select-label">الدفعة</InputLabel>
            <Select
              sx={{ borderRadius: "1rem" }}
              labelId="year-select-label"
              id="year-select"
              value={formik.values?.year}
              required
              onChange={formik.handleChange}
              name='year'
              label="الدفعة"
            >
              {years.map((ele, ind) => (
                <MenuItem key={ind} value={ele}>{ele}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "150px", borderRadius: "1rem" }}>
            <InputLabel sx={{ color: "#fff", marginTop: "-0rem" }} id="type-select-label-1">النوع</InputLabel>
            <Select
              sx={{ borderRadius: "1rem" }}
              labelId="type-select-label-1"
              id="type-select-1"
              value={formik.values?.type}
              required
              onChange={formik.handleChange}
              name='type'
              label="النوع"
            >
              <MenuItem value="شرح">شرح</MenuItem>
              <MenuItem value="مراجعة">مراجعة</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "150px", borderRadius: "1rem" }}>
            <InputLabel sx={{ color: "#fff", marginTop: "-0rem" }} id="type-select-label-2">الترم</InputLabel>
            <Select
              sx={{ borderRadius: "1rem" }}
              labelId="type-select-label-2"
              id="type-select-2"
              value={formik.values?.semister}
              required
              onChange={formik.handleChange}
              name='semister'
              label="الترم"
            >
              <MenuItem value="الأول">الأول</MenuItem>
              <MenuItem value="الثاني">الثاني</MenuItem>
            </Select>
          </FormControl>


        </Stack>
        <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
          {filterdData?.map((ele) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={ele._id}>
              <Card sx={{ margin: { sm: "10px 20px", xs: "10px auto" }, display: "flex", alignItems: "center", flexDirection: "column", color: "#fff", maxWidth: 345, backgroundColor: "unset", boxShadow: " 0 0 10px 1px rgba(255,255,255,0.5)", }}>
                <Stack
                  direction={"row"}
                  sx={{ padding: "5px", justifyContent: "space-between", width: "100%!important", flexGrow: "1", }}>
                  <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => setDialoge({ open: true, id: ele._id })} />
                  <Box sx={{ cursor: "pointer", height: "120px" }} onClick={() => setUpdate({ open: true, data: ele })}>
                    <img className="d-block m-auto" src={book} width="100px" height="100px" alt="pdf" />
                    <Typography fontSize="1rem" style={{ color: "var(--secondary)" }} variant="body2" sx={{ textAlign: "end", color: "secondary", transform: "translateY(-20px)" }}>
                      تعديل <ModeEditOutlineIcon color="secondary" />
                    </Typography>
                  </Box>
                  <div></div>
                </Stack>
                <Typography variant="h5" sx={{ margin: "5px 0", textDecoration: "1px solid primary" }}>
                  {ele?.name}
                </Typography>
                <Grid container sx={{ padding: "0 1rem 1rem" }}>
                  <Grid item xs={6} sx={{ padding: "0" }}>
                    <Typography variant="h6" sx={{ margin: "0px 0", textAlign: "center" }}>
                      {ele?.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ padding: "0" }}>
                    <Typography variant="h6" sx={{ margin: "0px 0", textAlign: "center" }}>
                      {ele?.grade}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ padding: "0" }}>
                    <Typography variant="h6" sx={{ margin: "0px 0", textAlign: "center" }}>
                      الترم  {ele?.semister}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ padding: "0" }}>
                    <Typography variant="h6" sx={{ margin: "0px 0", textAlign: "center" }}>
                      دفعة   {ele?.year}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ padding: "0" }}>
                    <Typography variant="h6" sx={{ margin: "0px 0", textAlign: "center" }}>
                      {ele?.printType}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ padding: "0" }}>
                    <Typography variant="h6" sx={{ margin: "0px 0", textAlign: "center" }}>
                      {ele?.paperPrint}
                    </Typography>
                  </Grid>
                </Grid>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%", padding: " 0 1rem " }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      background:
                        "linear-gradient(to right, #FF1105, #FCBB43)",
                      fontWeight: 700,
                    }}
                    onClick={() =>
                      handlePrintPDF(apiUrl + ele.src)
                    }
                  >
                    طباعة
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      background:
                        "linear-gradient(to right, #FF1105, #FCBB43)",
                      fontWeight: 700,
                    }}
                    onClick={() => navigate('/preview/' + ele?._id)}
                  // onClick={() => setModal({ open: true, update: false })}
                  >
                    معاينة
                  </Button>
                </Stack>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    padding: "0 30px 10px",
                  }}
                ></div>

                <Preview
                  open={modal.open}
                  handleClose={handleClose}
                  src={ele?.src}
                />
                <CopyNumber
                  open={copyModal.open}
                  handleCloseCopy={handleCloseCopy}
                  teacher={id}
                  pdf={ele?._id}
                />
                {/* </Grid>  */}
              </Card>
            </Grid>
          ))}
        </Grid>
        <AddPdf />
      </Container>
      <ConfirmationDialoge
        type={'pdf'}
        open={dialog.open}
        handleClose={handleCloseDialoge}
        id={dialog.id}
      />
      <AddPdf
        update={update.open}
        data={update.data}
        handleCloseUpdate={handleCloseUpdate}
      />
    </>
  );
};

export default Pdfs;
