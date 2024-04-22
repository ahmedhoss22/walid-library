import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Home from '../Pages/Home';
import theme from "../utilities/Theme"
import { ThemeProvider } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import TeacherContent from '../Pages/TeacherContent';
import Pdfs from '../Pages/Pdfs';
import Year from '../Pages/Year';

export default function App() {
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
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            padding: "16px 24px",
          },
        }}
      />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teacher-content/:id" element={<TeacherContent/>} />
            <Route path="/pdfs/:id" element={<Year/>} />
            <Route path="/pdfs/:id/:year" element={<Pdfs/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
    </>
  );
}
