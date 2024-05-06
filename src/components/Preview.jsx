import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { apiUrl } from "../config/api";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";  
const { ipcRenderer } = window.require('electron');

 
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

  const handlePrint = (url) => {
    ipcRenderer.send('print-pdf', url);
};

 



  const viewerRef = useRef(null);

  // const handlePrint = useReactToPrint({
  //   content: () => viewerRef.current,
  // });

  // const handlePrint = (url) => {
  //     const printWindow = window.open(apiUrl + url, "_blank");

  //     printWindow.addEventListener("load", () => {
  //       printWindow.print();
  //     });
  //   };


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
              <Viewer fileUrl={apiUrl + src} key={src} />
            </div>
          </Worker>

          <Button
            onClick={() => handlePrint(apiUrl+src)}
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
