import React from "react";
import { useSelector } from "react-redux";
import vars from "../../assets/styles/variables";
import { Typography, Stack, Box } from "@mui/material";

const { lightBlack } = vars;

export const LogViewer = ({
    title = "title",
    description = "description",
}) => {
    const errorTitle = useSelector((state) => state.general.errorTitle);
    const errorMessage = useSelector((state) => state.general.errorMessage);

    return (
        <Stack spacing={2} mb={3} overflow="hidden" minHeight={0.85}>
            <Typography
                sx={{
                    fontSize: "2.5rem",
                    fontWeight: 600,
                    color: lightBlack,
                    lineHeight: 1.2,
                }}
            >
                {errorTitle}
            </Typography>
            <Box
                height={1}
                overflow="scroll"
                sx={{
                    border: `2px solid`,
                    borderColor: "#F4F4F4",
                    padding: "8px",
                    color: "initial",
                    borderRadius: "1px",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "21px",
                    }}
                >
                    {errorMessage}
                </Typography>
            </Box>
        </Stack>
    );
};
