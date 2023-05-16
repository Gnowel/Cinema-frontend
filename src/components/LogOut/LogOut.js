import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Typography, Box, Button} from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const Logout = ({ setUser }) => {

  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  }

  useEffect(() => {
    showModal()}, [])

  const loggingOut = async () => {
    return await fetch("api/account/logout", {method: "POST"})
      .then((response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "", userRole: "" })
        
        response.status === 401 ? navigate("/login") : navigate("/")
        setOpen(false)
      });
  };
  
  const handleCancel = () => {
    console.log("Clicked cancel button")
    setOpen(false)
    navigate("/")
  }

  return (
    <Modal title="Title" open={open} onCancel={handleCancel}>
      <Box sx={style}>
        <Typography >Выполнить выход?</Typography>
        <Button onClick={loggingOut}>Да</Button>
        <Button onClick={handleCancel}>Нет</Button>
      </Box>
    </Modal>
  );
};
