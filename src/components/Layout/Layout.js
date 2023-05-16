import { React } from "react";
import { Outlet } from "react-router-dom";
import { Box} from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ user, setUser}) => {

  console.log(user);
  
  return (
    <Box sx={{backgroundColor: "#F4F4F4", overflow: "hidden"}}>
      <Header user={user} setUser={setUser} />
      <Box >
        <Outlet/>
      </Box>
      <Footer/>
    </Box>
  );
};
