import { FormControl, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import logo from "../images/logo.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../css/navbar.css"

const Navbar = ({ children }) => {
  const [active, setActive] = useState(null);
  const [route, setRoute] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActive(1);
        break;
      case "/payments":
        setActive(2);
        break;
      case "/all-pdfs":
        setActive(3);
        break;
      default:
        setActive(null);
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (route !== null) {
      navigate(route);
    }
  }, [route, navigate]);

  function handleNavigate(route, no) {
    setActive(no);
    setRoute(route);
  }

  return (
    <Stack
      direction="row-reverse"
      justifyContent={"space-between"}
      sx={{ border: "1px solid #fff", borderRadius: "1rem", padding: "0 32px", gap: { lg: "5rem", md: "4rem" } }}
    >
      <Stack direction={"row-reverse"} gap={2} alignItems={"center"}>
        <button
          className={`nav-link btns ${active === 1 ? "active" : ""}`}
          style={{ color: active === 1 ? "var(--secondary)" : "#fff" }}
          onClick={() => handleNavigate("/", 1)}
        >
          المدرسين
        </button>
        <button
          className={`nav-link btns ${active === 2 ? "active" : ""}`}
          style={{ color: active === 2 ? "var(--secondary)" : "#fff" }}
          onClick={() => handleNavigate("/payments", 2)}
        >
          الحسابات
        </button>
        <button
          className={`nav-link btns ${active === 3 ? "active" : ""}`}
          style={{ color: active === 3 ? "var(--secondary)" : "#fff" }}
          onClick={() => handleNavigate("/all-pdfs", 3)}
        >
          المذكرات
        </button>
      </Stack>
      {children}
      <img src={logo} alt='logo' placeholder='Logo' width="180px" height="80px" />
    </Stack>
  )
}

export default Navbar;
