import { FormControl, Stack } from '@mui/material'
import React, { useState } from 'react'
import SearchInput from './SearchInput'
import logo from "../images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import "../css/navbar.css"

const Navbar = ({ children }) => {
  const [active, setActive] = useState()
  const navigate = useNavigate()

  function handleNavigate(route, no) {
    setActive(no)
    navigate(route)
  }

  return (
    <Stack direction="row-reverse" justifyContent={"space-around"} sx={{ border: "1px solid #fff", borderRadius: "1rem", padding: "0 32px", gap: { lg: "5rem", md: "4rem" } }}>
      <Stack direction={"row-reverse"} gap={2} alignItems={"center"}>
        <button className={`nav-link btns ${active === 1 ? "active" : ""}`} onClick={() => handleNavigate("/", 1)}>
          المدرسين
        </button>
        <button className={`nav-link btns ${active === 2 ? "active" : ""}`} onClick={() => handleNavigate("/payments", 2)}>
          الحسابات
        </button>
        <button className={`nav-link btns ${active === 3 ? "active" : ""}`} onClick={() => handleNavigate("/all-pdfs", 3)}>
          المذكرات
        </button>
      </Stack>
      {
        children
      }
      <img src={logo} alt='logo' placeholder='Logo' width="180px" height="80px" />
    </Stack >
  )
}

export default Navbar