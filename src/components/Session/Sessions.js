import {React, useEffect} from "react";
import {Box, Typography, Container, ButtonBase} from "@mui/material";
import { SessionsPage } from "./SessionsPage";

const boxTypography = {
    backgroundColor : "#141414",
    weight: 30,
    textAlign: "center",
    height: 50,
    display: "flex",
    alignItems: "center"
}

const button = {
    marginLeft: 5,
    color: "#A1A1A1",
    pading: 0,
    '&:hover':{
        color: "white",
        backgroundColor: 'transparent',
    },
    textTransform: "none",
    fontSize: 22,
    fontWeight: 700,
    backgroundColor: 'transparent',
}

export const Sessions = ({ sessions, setSessions}) => {

    useEffect(() => {
        const getSessions = async () => {
            try {
                const res = await fetch("api/session/today");
                const data = await res.json();
                setSessions(data);
            } catch (error) {
                console.log(error);
            }
        };

        getSessions();
    }, []);

    const tomorrow = () => {
        fetch("/api/session/tomorrow")
          .then((res) => res.json())
          .then((data) => {
            setSessions(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const today = () => {
        fetch("api/session/today")
          .then((res) => res.json())
          .then((data) => {
            setSessions(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    return (
        <Container sx={{ marginTop: 5}}>
            <Box sx={{ bgcolor: "white", minHeight: 40}}>
                <Box sx={boxTypography}>
                    <ButtonBase>
                        <Typography variant="button" onClick={today} sx={button}>Сегодня</Typography>
                    </ButtonBase>
                    <ButtonBase>
                        <Typography variant="button" onClick={tomorrow} sx={button}>Завтра</Typography>
                    </ButtonBase>
                </Box>
                <SessionsPage sessions={sessions}/>
            </Box>
        </Container>
    );
};