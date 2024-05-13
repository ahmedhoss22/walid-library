import Navbar from '../components/Navbar'
import { Container, FormControl, InputAdornment, OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddPdf from '../components/AddPdf';
import ConfirmationDialoge from '../components/ConfirmationDialoge';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
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
import { getPdfs, getTeacherPdf } from "../redux/slices/pdf.slice";
import AddTeacher from "../components/AddTeacher";
// import { ipcRenderer } from 'electron';
import Preview from "../components/Preview";
import CopyNumber from "../components/CopyNumber";
import Slider from "react-slick";
import { PDFDocument, rgb } from 'pdf-lib';

const Allpdfs = () => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "5px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 3,
  };
  const pdfs = useSelector((state) => state?.pdf?.all);

  console.log(pdfs);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState();

  useEffect(() => {
    dispatch(getPdfs());
  }, []);

  const [dialog, setDialoge] = useState({ open: false, id: "" });

  function handleCloseDialoge() {
    setDialoge({ open: false, id: "" });
  }

  const [update, setUpdate] = useState({ open: false, data: {} });
  function handleCloseUpdate() {
    setUpdate({ open: false, data: {} });
  }

  let filterdData = pdfs;
  if (search) {
    filterdData = filterdData?.filter(
      (ele) => ele?.name?.includes(search) || ele?.year?.includes(search) || ele?.teacher?.name?.includes(search)
    );
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
          }, 3000)

        };
      } else {
        console.error('Failed to open print window');
      }
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };

  return (
    <>
      <Container sx={{ marginTop: "1.5rem" }}>
        <Navbar >
          <FormControl sx={{ flexGrow: 1 }}>
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
                margin: "15px",
                letterSpacing: "2px",
                borderRadius: "1rem"
              }}
              placeholder='Search'
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
        </Navbar>


        <div className="slider-container">
          <Slider {...settings}>
            {filterdData?.map((ele) => (
              <div key={ele._id}>
                {/* <Grid item xs={4}> */}
                <Card sx={{ margin: " 10px 20px", display: "flex", alignItems: "center", flexDirection: "column", color: "#fff", maxWidth: 345, backgroundColor: "unset", boxShadow: " 0 0 10px 1px rgba(255,255,255,0.5)", }}>
                  <Stack
                    direction={"row"}
                    sx={{ 
                      justifyContent: "space-between",
                      width: "100% !important",
                      flexGrow: "1",
                    }}
                  >
                    <DeleteIcon
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => setDialoge({ open: true, id: ele._id })}
                    />
                    <Box
                      sx={{ cursor: "pointer", height: "120px" }}
                      onClick={() => setUpdate({ open: true, data: ele })}
                    >
                      <img className="d-block m-auto" src={book} width="100px" height="100px" alt="pdf" />
                      <Typography fontSize="1rem" style={{ color: "var(--secondary)" }} variant="body2" sx={{ textAlign: "end", color: "secondary", transform: "translateY(-15px)" }}>
                        تعديل <ModeEditOutlineIcon color="secondary" />
                      </Typography>
                    </Box>
                    <div></div>
                  </Stack>
                  <Typography variant="h5" sx={{ margin: "00", textDecoration: "1px solid primary" }}>
                  أ/ {ele?.teacher?.name} 
                </Typography>
                  <Typography variant="h5" sx={{ margin: "5px 0", textDecoration: "1px solid primary" }}>
                    {ele?.name}
                  </Typography>
                  <Typography variant="h6" sx={{ margin: "5px 0" }}>
                    {ele?.year}
                  </Typography>

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
                      onClick={() => setModal({ open: true, update: false })}
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
                    pdf={ele?._id}
                  />
                  {/* </Grid>  */}
                </Card>
              </div>
            ))}
          </Slider>
        </div>
        {/* </Grid> */}
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
  )
}

export default Allpdfs