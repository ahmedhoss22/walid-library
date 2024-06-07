import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Stack } from "@mui/material";
import InputField from "./InputField";
import { useFormik } from "formik";
import Api, { handleApiError } from "../config/api";
import { notifyError, notifySuccess } from "../utilities/toastify";

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
      copies: 0,
    },
    onSubmit: handleSubmit
  });

  function handleSubmit(values) {

    const { copies, ...data } = values;
    if(copies <1){
      return notifyError("يجب ادخال عدد النسخ قبل التأكيد")
    }
    console.log({ teacher, pdf, copies });
    delete data.values;
    delete data.copies;

    // const { copies } = values;  
    // console.log({ teacher, pdf, copies});
    Api.post("/prints", { teacher, pdf, copies })

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
            قم بادخال عدد النسخ التي طبعت
          </h2>
          <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
            {" "}
            <Grid item xs={12}>
              <InputField fullWidth required type="number" name="copies" value={formik.values?.copies} onChange={formik.handleChange} variant="outlined"  label="عدد النسخ"/>
            </Grid>
            <Grid item xs={12} sx={{marginTop:"1rem"}}>
              <Stack direction={"row"} gap={4}>
                <Button onClick={()=>handleCloseCopy()} fullWidth variant="contained" type="button" color="error">
                  الغاء
                </Button>
                <Button  fullWidth variant="contained" type="submit" color="success" sx={{fontWeight: 700,color:"#fff" }}>
                  تأكيد
                </Button>
              </Stack>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CopyNumber;
