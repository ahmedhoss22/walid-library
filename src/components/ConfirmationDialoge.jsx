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
import { getPdfs, getTeacherPdf } from '../redux/slices/pdf.slice';
import { getPrints } from '../redux/slices/print.slice';
import { useParams } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialoge({ type, id, open, handleClose }) {

  const { id: teacherId } = useParams()
  const [password, setPassword] = React.useState()
  const dispatch = useDispatch()

  function handleDelete(e) {
    e.preventDefault()
    let url;
    switch (type) {
      case 'pdf':
        url = "/pdf/";
        break;
      case "payment":
        url = "/prints/";
        break;
      default:
        url = "/prints/";
    }
    if (type === 'pdf') {
    } else {

    }

    Api.put(url + id, { password })
      .then(() => {
        if (type === 'pdf') {
          notifySuccess("تم حذف المذكرة")
          dispatch(getTeacherPdf(teacherId))
          dispatch(getPdfs());
        } else {
          dispatch(getPrints())
          notifySuccess("تم حذف الطباعة")

        }
      })
      .catch((error) => {
        console.log(error);
        handleApiError(error)
      })
      .finally(() => { handleClose() })

  }

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
      <DialogTitle sx={{ fontWeight: "700", direction: "rtl", fontSize: "1.4rem " }}>رسالة تأكيد</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" sx={{ fontWeight: "500", fontSize: "1.2rem ", textAlign: "center" }}>
          {type === 'pdf' ? ' هل انت متأكد من حذف هذه المذكرة ؟' : 'هل انت متأكد من حذف هذه الطباعة '}

        </DialogContentText>

      </DialogContent>
      <form onSubmit={handleDelete}>
        <Stack>
          <label htmlFor='password' style={{ margin: " 0 12px", textAlign: "end" }} >كلملة السر</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' required style={{ padding: "12px", margin: "12px" }} />

          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button variant='outlined' sx={{ fontWeight: "500", fontSize: "1.1rem" }} onClick={handleClose} color='info'>غلق</Button>

            <Button type='submit' variant='contained' sx={{ fontWeight: "500", fontSize: "1.1rem" }} color='error'>
              {type === 'pdf' ? 'مسح المذكرة ' : 'حذف'}
            </Button>
          </DialogActions>
        </Stack>
      </form>
    </Dialog>
  );
}
