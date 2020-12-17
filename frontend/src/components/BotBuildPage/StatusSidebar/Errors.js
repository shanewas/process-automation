import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  error: {
    backgroundColor: "#2A2A2A",
    borderLeft: "5px solid #FF2424",
    transition: ".3s",
    cursor: "pointer",
    borderRadius: "5px",

    "&:hover": {
      transform: "scale(1.02)",
    },
  },
});

export default (props) => {
  const classes = useStyles();
  const errors = useSelector((state) => state.errors);
  const fErrors = Object.keys(errors).map((processId) => ({
    processId,
    ...errors[processId],
  }));

  return (
    <Box mt={5} textAlign="center">
      {!fErrors.length ? (
        <>
          <img src="/assets/images/no_errors.svg" alt="Csv" />
          <Box my={2}>
            <Typography variant="h6">
              Everything looks good, no errors
            </Typography>
          </Box>
        </>
      ) : (
        <>
          {fErrors.map((error) => (
            <Box
              mb={2.5}
              textAlign="left"
              py={2}
              px={2}
              key={error.processId}
              className={classes.error}
              onClick={() => props.selectErrorStep(error.processId)}
              onMouseLeave={(e) => props.selectErrorStep("")}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box
                  px={1}
                  py={0.5}
                  bgcolor="#000000"
                  fontSize="14.5px"
                  borderRadius="4px"
                >
                  {error.type}
                </Box>
                <Box fontSize="12.5px">Process ID: {error.processId}</Box>
              </Box>
              <Box mt={1} fontSize="15px" fontWeight={700}>
                {error.message}
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};
