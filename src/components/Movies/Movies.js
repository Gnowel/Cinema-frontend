import {React, useEffect} from "react";
import {Box, Typography, Grid, Link, Chip, Container} from "@mui/material";


const poster = {
    width: "100px",
    borderRadius: "4px",
}


export const Movies = ({sessions, setSessions}) => {

    const formatDate = inputDate => {
        const date = new Date(inputDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleString("ru-RU", options);
    }

    useEffect(() => {
        const getSessions = async () => {

            return await fetch("api/session/movies-release")
                .then((res) => res.json())
                .then((data) => {
                    setSessions(data);
                }).catch((error) => {
                    console.log(error);
                });
        };

        console.log(sessions)
        getSessions();
    }, [setSessions]);

    return (
        <Container sx={{ marginTop: 5}}>
            <Box sx={{ bgcolor: "white"}}>
                <Box  sx={{alignContent: "center", bgcolor: "#141414"}}>
                    <Typography variant="h4" sx={{textAlign: "center", color: "white"}}>Уже в кино</Typography>
                </Box>
                <Box sx={{margin: 3}}>
                    {sessions.map(session => (
                        <Grid key={session.movie.movieId} container spacing={3} sx={{marginTop: 1, marginBottom: 2}}>
                            <Grid item>
                                <img style={poster} src={`data:image/jpeg;base64,${session.movie.poster}`} />
                            </Grid>
                            <Grid item xs={12} md={8}>

                                <Grid container spacing={2} alignItems="baseline">
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component={Link} href={`/movies/${session.movie.movieId}`} underline="hover">{session.movie.title}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    {session.movie.genres.map(genre => (
                                        <Chip key={genre.genreId} label={genre.name} variant="outlined" style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }} />
                                    ))}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">
                                        Начало проката: {formatDate(session.movie.releaseData)}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}