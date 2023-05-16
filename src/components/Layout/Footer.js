import React from "react";
import {Box, Typography} from "@mui/material";

const typography = {
    color: "#A1A1A1",
    textAlign: "center",
    variant: "subtitle1",
    fontWeight: 500,
    fontSize: 15,
};

const box = {
    bgcolor: "#141414",
    flex: "0 0 auto",
    height: 20,
    bottom: 0,
    width: "100%",
    textAlign: "center",
}

export const Footer = () => {
    return (
        <Box alignContent="center" sx={box}>
            <Typography sx={typography}>@ 2023 Парамонов А.А.</Typography>
        </Box>
    );
};