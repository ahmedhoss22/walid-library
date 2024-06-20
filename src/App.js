import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import icon from './assets/icon.svg';
import './App.css';
import Home from './Pages/Home';
import Balance from './Pages/Balance';
import Preview from './Pages/Preview';
import theme from "./utilities/Theme"
import { ThemeProvider } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import { Provider, useDispatch, useSelector } from 'react-redux';
import TeacherContent from './Pages/TeacherContent';
import Pdfs from './Pages/Pdfs';
import Year from './Pages/Year';
import Allpdfs from './Pages/Allpdfs';
import Payments from './Pages/Payments';
import Login from './Pages/Login';
import { useEffect } from 'react';
import Api from './config/api';
import { logout, login } from './redux/slices/user.slice';

export default function App() {
  const logedin = useSelector((state) => state.user.logedin)
  const dispatch = useDispatch()

  console.log(logedin);
  useEffect(() => {
    async function checklogin() {
      await Api.post("/auth/online", {})
        .then(() => dispatch(login()))
        // .catch(() => dispatch(logout()))
    }
    checklogin()
  }, [])
  return (
    <>
      <Toaster
        position="top-center"
        gutter={8}
        containerStyle={{ margin: "12px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 2000,
          },
          style: {
            fontSize: "16px",
            padding: "16px 24px",
          },
        }}
      />

      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={logedin ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/teacher-content/:id" element={logedin ? <TeacherContent /> : <Login />} />
            <Route path="/all-pdfs" element={logedin ? <Allpdfs /> : <Login />} />
            <Route path="/payments" element={logedin ? <Payments /> : <Login />} />
            {/* <Route path="/pdfs/:id" element={logedin ?  <Year /> : <Login/>} /> */}
            <Route path="/balance/:id" element={logedin ? <Balance /> : <Login />} />
            <Route path="/preview/:id" element={logedin ? <Preview /> : <Login />} />
            <Route path="/pdfs/:id" element={logedin ? <Pdfs /> : <Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}
