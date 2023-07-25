import React from "react";
import { useSelector } from "react-redux";
import { Typography, Stack, Box } from "@mui/material";

function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map(str => <p>{str}</p>);

    return newText;
}

export const LogViewer = ({
    title = "title",
    description = "description",
}) => {
    const results = useSelector((state) => state.general.results);

    return (
        <Stack spacing={2} mb={3} overflow="hidden" minHeight={0.85}>
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
                {results['raw_output'] !== undefined
                    ? results['raw_output'].map(element => {
                        return (
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "21px",
                                }}
                            >
                                <NewlineText text={element} />
                            </Typography>
                        )})
                    : (<></>)
                }
            </Box>
        </Stack>
    );
};
