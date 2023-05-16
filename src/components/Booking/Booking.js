import {React, useState, useEffect} from "react";
import { Box, Button, Dialog, DialogTitle, Grid, Typography} from "@mui/material";
import { Ticket } from "./Ticket";

const buttonStyle = {
    width: "5px",
    height: 20,
    fontSize: 15,
}

export const Booking = ({open, onClose, id}) => {

    const [seats, setSeats] = useState([]);
    const [session, setSession] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [openTicket, setOpenTicket] = useState(false);
    const [ticket, setTicket] = useState("");

    const handleClickOpenTicket = () => {
        setOpenTicket(true);
    };

    
    const handleClickCloseTicket = () => {
        setOpenTicket(false);
        setSelectedSeat([]); 
    };

    const formatDate = inputDate => {
        const date = new Date(inputDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleString("ru-RU", options);
    }

    const handleSeatClick = (seat) => {
        if(seat === selectedSeat)
          setSelectedSeat([]);
        else{
            setSelectedSeat(seat)
            console.log(selectedSeat)
        }
      };

    const formatTime = (inputTime) => {
        const data = new Date(`1970-01-01T${inputTime}Z`);
        const hours = data.getUTCHours();
        const minutes = data.getUTCMinutes();
        return hours + ":" + minutes;
    }

    const booking = () => {
        
        const randomNumber = Math.random().toString().slice(2);
        const numericOnly = randomNumber.replace(/[^0-9]/g, '');
        const maxLength = 14;
        setTicket(numericOnly.slice(0, maxLength));
        console.log(session.sessionId);
        const bookingTicket = async () => {
            return await fetch("/api/booking/booking-ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                ticketNumber: ticket,
                sessionId: id,
                seatId: selectedSeat.seatId,
                }),
            }).then(() => {
                handleClickOpenTicket();
            }).catch((error) => {
                console.log(error);
            });
        }
        bookingTicket();
    }

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
    }, [open, openTicket])

      useEffect(() => {
        const getSeats = async () => {

            return await fetch(`/api/seat/session-seats/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setSeats(data);
                    console.log(id)
                }).catch((error) => {
                    console.log(error);
                });
        };

        console.log(session)
        getSeats();
    }, [ openTicket, open]);


    return (
        <Dialog open={open} onClose={() => {setSelectedSeat([]); onClose()}}>
            <DialogTitle sx={{width: 550, backgroundColor: "white"}}>
                    <Box>
                        <Box>
                            <Box>
                                <Typography sx={{textAlign: "center", color: "black"}}>{session?.movie?.title}</Typography>
                                <Typography>{formatDate(session.date) + " в " + formatTime(session.time)}</Typography>
                            </Box>
                        </Box> 
                        <Grid container spacing={0.5}>
                                {seats.map((seat) => (
                                    <Grid item  key={seat.seatId}>
                                    <Button
                                        variant="contained"
                                        sx={buttonStyle}
                                        style={{ backgroundColor: selectedSeat === seat ? 'blue' : 'green' }}
                                        disabled={seat.status || (selectedSeat && selectedSeat.seatId === seat.seatId)}
                                        onClick={() => handleSeatClick(seat)}>
                                        {seat.rowNumber}-{seat.seatNumber}
                                    </Button>
                                    </Grid>
                                ))}
                            <Grid Grid item xs={12} sx={{display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button variant="contained" sx={{ textTransform: "none",}} onClick={booking}>
                                    Забронировать место
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                <Ticket open={openTicket} id={id} seat={selectedSeat} ticket={ticket} onClose={handleClickCloseTicket}/>
            </DialogTitle>
        </Dialog>
    );
};