import {React, useEffect, useState} from "react";
import {Box,Typography, Dialog, } from "@mui/material";


export const Ticket = ({open, id, seat, ticket, onClose}) => {
    const [session, setSession] = useState([]);

    useEffect(() => {
        const getSession = async () => {
            return await fetch(`/api/session/session-by-id/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setSession(data);
                    console.log(session)
                })
        }
        getSession();
    }, [open])

    return (
        <Dialog open={open} sx={{border: 0}} onClose={onClose}>
            {session.time !== undefined  && seat !== undefined &&
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    bgcolor: '#E5E5E5',
                    overflow: "hidden",
                    width: 400,
                }}
                >
                <Box sx={{ flexGrow: 1, padding: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {session?.movie?.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Зал: {session.hall.name}, Ряд: {seat.rowNumber}, Место: {seat.seatNumber}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Номер билета: №{ticket}
                    </Typography>
                    <Typography variant="subtitle1">Дата сеанса: 15.05.2023</Typography>
                </Box>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 40,
                    p: 1,
                    bgcolor: '#0000FF',
                    position: 'relative',
                    left: 1,
                    }}
                >
                    <Typography
                    variant="button"
                    sx={{
                        color: 'white',
                        transform: 'rotate(-180deg)',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        fontWeight: 'bold',
                    }}
                    >
                    Контроль
                    </Typography>
                </Box>
            </Box>
        }
        </Dialog>
    );
};