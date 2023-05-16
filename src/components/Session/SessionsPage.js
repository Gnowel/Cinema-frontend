import {React} from "react";
import {Box, Typography, Accordion, AccordionSummary, Button, AccordionDetails, Link, } from "@mui/material";

export const SessionsPage = ({ sessions}) => {

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('ru-RU', options);
        return formattedDate;
    }

    const schedule = sessions.reduce((acc, session) => {
        const index = acc.findIndex(movie => movie.id === session.movie.movieId);
        if (index >= 0) {
          acc[index].sessions.push(session);
        } else {
          acc.push({
            id: session.movie.movieId,
            name: session.movie.title,
            date: session.date,
            sessions: [session]
          });
        }
        return acc;
      }, []);

    return (
        <Box sx={{margin: 3}}>
                <Typography sx={{fontWeight: 750, marginBottom: 5, textAlign: "center"}}></Typography>
                {schedule.map(session => (
                    <Accordion  key={session.sessionsId}>
                        <AccordionSummary>
                            <Typography sx={{fontWeight: 700,}}>{session.name} | {formatDate(schedule[0].date)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {session.sessions.map(s => (
                            <Button key={s.price} variant={Link} href={`/movies/${session.id}`} underline="hover" color="primary" style={{ marginRight: '10px' }}>  
                                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                                    <Typography variant="caption">{s.time.substring(0, 5)}</Typography>
                                    <Typography variant="caption" sx={{textTransform: "none",}}>{s.price} р.</Typography>
                                    <Typography variant="caption" sx={{textTransform: "none",}}>Зал {s.hall.name}</Typography>
                                </Box>
                                <br/>
                            </Button>
                            ))}
                        </AccordionDetails>         
                    </Accordion>
                ))}
        </Box>
    );
};