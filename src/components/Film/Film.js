import {React, useEffect, useState} from "react";
import {Box, Typography, Grid, Button, Accordion, AccordionDetails, AccordionSummary, Container} from "@mui/material";
import { useLocation } from 'react-router-dom';
import {Booking} from "../Booking/Booking";

const poster = {
    width: "200px",
    borderRadius: "4px",
}

export const Film = ({sessions, setSessions, user}) => {

    const [openBooking, setOpenBooking] = useState(false);
    const [sessionId, setSessionId] = useState(0);

    const handleClickOpenBooking = (sesion) => {
        setSessionId(sesion);
        setOpenBooking(true);
        console.log(openBooking)
    };
    
    const handleClickCloseBooking = () => {
        setOpenBooking(false);
    };

    const location = useLocation();
    const id = location.pathname.split('/').pop();

    const formatDate = inputDate => {
        const date = new Date(inputDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleString("ru-RU", options);
    }

    const formatTime = (inputTime, isNormal) => {
        const data = new Date(`1970-01-01T${inputTime}Z`);
        const hours = data.getUTCHours();
        const minutes = data.getUTCMinutes();
        if(isNormal == true){
            return hours + ":" + minutes;
        }
        return hours * 60 + minutes;
    }

    useEffect(() => {
        const getSessions = async () => {

            return await fetch(`/api/session/sessions-by-movie/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setSessions(data);
                    console.log(data);
                }).catch((error) => {
                    console.log(error);
                });
        };

        console.log(sessions)
        getSessions();
    }, [setSessions]);

    const groupedSessions = sessions.reduce((acc, session) => {
        const index = acc.findIndex((groupedSession) => groupedSession.date === session.date);
        if (index === -1) {
          acc.push({ 
            date: session.date, 
            sessions: [session]
        });
        } else {
          acc[index].sessions.push(session);
        }
        return acc;
      }, []);

    return (
        <Container sx={{ marginTop: 5}}>
            {sessions.length > 0 ? (
                <Box sx={{ bgcolor: "white"}}>
                    <Box sx={{alignContent: "center", bgcolor: "#141414", height: 60}}>
                        <Typography variant="h6" sx={{textAlign: "center", color: "#A1A1A1"}}>{sessions[0].movie.title}</Typography>
                    </Box>

                    <Box sx={{backgroundColor: "white"}} container spacing={2} >
                        <Grid  container spacing={2}>
                            <Grid item>
                                <img style={poster} src={`data:image/jpeg;base64,${sessions[0].movie.poster}`} />
                            </Grid>
                            <Grid item >
                                <Typography sx={{fontSize: 20}} textAlign={"center"}>О фильме</Typography>
                                <Typography variant="body1" component="span">Премьера в мире: </Typography>
                                <Typography variant="subtitle1" component="span">{formatDate(sessions[0].movie.releaseData)}</Typography>
                                <br />
                                <Typography variant="body1" component="span">Режисер: </Typography>
                                <Typography variant="subtitle1" component="span">{sessions[0].movie.director}</Typography>
                                <br />
                                <Typography variant="body1" component="span">Время: </Typography>
                                <Typography variant="subtitle1" component="span">{formatTime(sessions[0].movie.time, false) + " мин. / " + formatTime(sessions[0].movie.time, true)}</Typography>
                                <br />
                                <Typography variant="body1" component="span">Возраст: </Typography>
                                <Typography variant="subtitle1" component="span">{sessions[0].movie.ageRestriction + "+"}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid sx={{backgroundColor: "white", alignContent: "center"}}>
                        <Typography sx={{fontSize: 20}} textAlign={"center"}>Обзор</Typography>
                        <Typography>{sessions[0].movie.synopsis}</Typography>
                    </Grid>
                    <br/>
                    <Grid sx={{backgroundColor: "white"}}>
                        <Typography sx={{fontSize: 20}} textAlign={"center"}>Расписание</Typography>
                        <br/>
                        {groupedSessions.map(session => (
                            <Accordion  key={session.sessionsId}>
                                <AccordionSummary>
                                    <Typography>{formatDate(session.date)}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                {user.isAuthenticated ? (
                                    <>
                                    {session.sessions.map(s => (
                                        <Button key={s.price} variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleClickOpenBooking(s.sessionsId)}>  
                                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography variant="caption">{s.time.substring(0, 5)}</Typography>
                                                <Typography variant="caption" sx={{textTransform: "none",}}>{s.price} р.</Typography>
                                                <Typography variant="caption" sx={{textTransform: "none",}}>Зал {s.hall.hallId}</Typography>
                                            </Box>
                                        </Button>
                                    ))}
                                    </>
                                ) : (
                                    <>
                                        {session.sessions.map(s => (
                                        <Button key={s.price} variant="contained" color="primary" style={{ marginRight: '10px' }} disableRipple disableElevation disableFocusRipple>  
                                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography variant="caption">{s.time.substring(0, 5)}</Typography>
                                                <Typography variant="caption" sx={{textTransform: "none",}}>{s.price} р.</Typography>
                                                <Typography variant="caption" sx={{textTransform: "none",}}>Зал {s.hall.hallId}</Typography>
                                            </Box>
                                        </Button>
                                        ))}

                                    </>
                                )}
                                </AccordionDetails>         
                            </Accordion>
                        ))}
                    </Grid>
                </Box>
            ) : (<></>)}
                <Booking open={openBooking} onClose={handleClickCloseBooking} id={sessionId} user={user} />
        </Container>
    );
};