import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { apiUrl } from "../config/api";
import { useRef } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { useNavigate, useParams } from "react-router-dom";
import { getPdfs, getTeacherPdf } from "../redux/slices/pdf.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import CopyNumber from "../components/CopyNumber";

const style = {
  width: 600,
  bgcolor: "#1D2D3C",
  color: "#fff",
  border: "2px solid #FCBB43",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  height: 490,
  overflowY: "auto",
};
export default function Preview() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pdfs = useSelector((state) => state?.pdf?.data);
  const viewerRef = useRef(null);
  const [pdf, setPdf] = useState();
  const navigate = useNavigate();

  console.log("id: " + id);
  console.log("pdfs", pdfs);

  const adjustPDFContent = async (pdfUrl) => {
    // Load the PDF from the URL
    try {
      const existingPdfBytes = await fetch(pdfUrl).then((res) =>
        res.arrayBuffer()
      );
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
          setTimeout(()=>{
            setCopyModal({open:true})
          },1000)

        };
      } else {
        console.error('Failed to open print window');
      }
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };

  useEffect(() => {
    dispatch(getPdfs(id));
    let pdf = pdfs.find((ele) => ele?._id == id);
    setPdf(pdf);
  }, [id]);
  console.log(pdf);

  const [copyModal, setCopyModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  const handleCloseCopy = () =>
    setCopyModal({ open: false, update: false, data: null });
  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <div>
        <TableContainer
          component={Paper}
          dir="rtl"
          style={{
            background: "#1D2D3C",
            margin: "10px",
            border: "2px solid #FCBB43",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  اسم المذكرة
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  سعر الغلاف
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  عدد الصفحات
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  سعر الورقة{" "}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  نوع الطباعة{" "}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  النوع{" "}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  سعر النسخة{" "}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  السنة الدراسية{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {pdf?.name}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {pdf?.coverCost}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {pdf?.pagesNo}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {pdf?.paperCost}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {pdf?.paperPrint}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  {pdf?.type}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {pdf?.oneCopyCost}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  {" "}
                  {pdf?.year}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={style}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <div ref={viewerRef} style={{ width: "100%", height: "100%" }}>
                <Viewer
                  fileUrl={apiUrl + pdf?.src}
                  key={pdf?.src}
                  style={{ width: "150%" }}
                />
              </div>
            </Worker>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "600px", paddingTop: "10px " }}
          >
            {" "}
            <Button
              variant="contained"
              type="button"
              onClick={() => navigate(`/pdfs/${pdf?.teacher}/${pdf?.year}`)}
              // style={{ position: "fixed", bottom: "-10px", left: "390px" }}
              sx={{
                background: "linear-gradient(to right, #FF1105, #FCBB43)",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              العودة
            </Button>
            <Button
              onClick={() => handlePrintPDF(apiUrl + pdf?.src)}
              variant="contained"
              type="button"
              // style={{ position: "fixed", bottom: "-10px", right: "390px" }}
              sx={{
                background: "linear-gradient(to right, #FF1105, #FCBB43)",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              طباعة
            </Button>
          </Stack>
          <CopyNumber
            open={copyModal.open}
            handleCloseCopy={handleCloseCopy}
            teacher={pdf?.teacher}
            pdf={pdf?._id}
          />
        </div>
      </div> 
    </Container>
  );
}
