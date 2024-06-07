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

export default function Preview({ open, handleClose, src }) {

  // const handlePrint = (url) => {
  // ipcRenderer.send('print-pdf', url);
  // };
  const handlePrintPdf = async (pdfUrl) => {
    try {
      // Fetch the PDF content from the server
      const response = await Api.get('/pdf', { params: { pdfUrl } });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab for printing
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };



  const viewerRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => viewerRef.current,
    onAfterPrint: () => { console.log("Done"); },
    // copyStyles: true,
    pageStyle: {
      width: '100vw',
      height: '100vh',
    },
  });

  // const handlePrint = (url) => {
  //     const printWindow = window.open(apiUrl + url, "_blank");

  //     printWindow.addEventListener("load", () => {
  //       printWindow.print();
  //     });
  //   };


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
          window.addEventListener('afterprint', () => {
            printWindow.close();
          });

        };
      } else {
        console.error('Failed to open print window');
      }
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };








  return (
    <>    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div ref={viewerRef} style={{ width: "100%", height: "100%" }}>
              <Viewer fileUrl={apiUrl + src} key={src} style={{ width: "150%" }} />
            </div>
          </Worker>



          <Button
            onClick={() => handlePrintPDF(apiUrl + src)}
            variant="contained"
            type="submit"
            style={{ position: "fixed", bottom: "30px", right: "50px" }}
            sx={{
              background: "linear-gradient(to right, #FF1105, #FCBB43)",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            طباعة
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

    </div>
    </>

  );
}
