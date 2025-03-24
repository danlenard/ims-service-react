import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          IMS Home Phone Subscriber Service
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Developed by Dan Lenard Hacutina for the TELUS Coding Exam
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;