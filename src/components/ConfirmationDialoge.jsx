import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Api, { handleApiError } from '../config/api';
import { notifySuccess } from '../utilities/toastify';
import { useDispatch } from 'react-redux';
import { getTeacherPdf } from '../redux/slices/pdf.slice';
import { getPrints } from '../redux/slices/print.slice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialoge({ type,id, open, handleClose }) {
 

  const dispatch = useDispatch()
  function handleDelete() {
    let url;
    if (type === 'pdf') {
      url = "/pdf/";
    } else {
      url = "/prints/";
    }
    
    Api.delete(url + id)
      .then(() => {
        if (type === 'pdf') {
          notifySuccess("تم حذف المذكرة")
          dispatch(getTeacherPdf())
        } else {
          dispatch(getPrints())
          notifySuccess("تم حذف الطباعة")

        }
      })
      .catch((error) => { handleApiError(error) })
      .finally(() => { handleClose() })

  }

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
      <DialogTitle sx={{ fontWeight: "500", direction: "rtl", fontSize: "1.3rem " }}>رسالة تأكيد</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" sx={{ fontWeight: "500", fontSize: "1.2rem " ,textAlign:"center"}}>
          {type === 'pdf' ?  ' هل انت متأكد من حذف هذه المذكرة ؟':'حذف'}
       
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button variant='outlined' sx={{ fontWeight: "500", fontSize: "1.1rem" }} onClick={handleClose} color='info'>غلق</Button>
        <Button variant='contained' sx={{ fontWeight: "500", fontSize: "1.1rem" }} onClick={handleDelete} color='error'>
  
          {type === 'pdf' ?  '        مسح المذكرة ':'حذف'}

          </Button>
      </DialogActions>
    </Dialog>
  );
}
