import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import SpiderLogo from "../assets/logo.png";
import AuthService from "../services/auth";
import { ToastAlertContainer } from "../components/ToastAlertContainer";
import { toastAlert } from "../components/ToastAlert";



const Login = () => {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { email, password } = formData;
  

  const navigate = useNavigate();
  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  
  const login = async (email, password) =>{
       try {
          const response = await AuthService.login(email, password);
          if (response.status === 200){
              toastAlert("success", "logado com sucesso.")
              setIsLoggedin(true);
          }
         
       } catch (error) {
         toastAlert("error", error.response.data.message)
       }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password)
  
  };

  if (isLoggedin){
    navigate("/dashboard")
    window.location.reload();
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={SpiderLogo} width={123} height={123} alt="logo" />
        <Typography component="h1" variant="h5">
          VMS
        </Typography>
        <ToastAlertContainer />
        <Box component="form" onSubmit={handleLogin}>
         
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => onChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => onChange(e)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Logar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Não tem conta? registrar"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
