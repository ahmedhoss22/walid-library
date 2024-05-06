import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import InputField from "./InputField";
import { useFormik } from "formik";
import Api, { handleApiError } from "../config/api";
import { notifySuccess } from "../utilities/toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  bgcolor: "#1D2D3C",
  color: "#fff",
  border: "2px solid #FCBB43",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};
const CopyNumber = ({ open, handleCloseCopy, teacher, pdf }) => {

  
  const formik = useFormik({
    initialValues: {
      copies: 1,
    },
    onSubmit: handleSubmit
  });

  function handleSubmit(values) {
    
    const { copies, ...data } = values; // Extract copies and exclude it from data
    console.log({ teacher, pdf, copies }); 
    delete data.values;
    delete data.copies;

    // const { copies } = values;  
    // console.log({ teacher, pdf, copies});
    Api.post("/prints", { teacher, pdf, copies})
      .then(() => {
        notifySuccess("تم اضافة عدد النسخ");
        formik.resetForm();
        handleCloseCopy();
      })
      .catch((error) => {
        handleApiError(error);
      });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseCopy}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
            style={{
              direction: "rtl",
              textAlign: "center",
              color: "white",
              textShadow:
                "-1px -1px 0 #FCBB43, 1px -1px 0 #FCBB43, -1px 1px 0 #FCBB43, 1px 1px 0 #FCBB43",
            }}
          >
            {" "}
            عدد النسخ
          </h2>
          <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
            {" "}
            <Grid item xs={12}>
              <InputField
                fullWidth
                required
                type="number"
                name="copies"
                value={formik.values?.copies}
                onChange={formik.handleChange}
                variant="outlined"
                label="عدد النسخ"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  background: "linear-gradient(to right, #FF1105, #FCBB43)",
                  fontWeight: 700,
                }}
              >
                تسليم
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CopyNumber;
