import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Home from "./pages/Home";
import Subscribers from "./pages/Subscribers";

const App: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/subscribers">Subscribers</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribers" element={<Subscribers />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;