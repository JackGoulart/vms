
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SpiderLogo from '../assets/logo.png';
import AuthService from "../services/auth";
import { useNavigate } from "react-router-dom";
import { ToastAlertContainer } from "../components/ToastAlertContainer";
import { toastAlert } from "../components/ToastAlert";


const Register = () => {
  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordCofirm : ""

  });
  const [isResgitered, setIsResgitered] = useState(false);
  const { name, email, password, passwordCofirm } = formData;
  const navigate = useNavigate();
  const onChange = (e) =>  SetFormData({ ...formData, [e.target.name]: e.target.value });
  
  const login = async (email, password) =>{
       try {
          const response = await AuthService.register(name, email, password, passwordCofirm);
          if (response.status === 200){
              console.log(response);
              toastAlert("success", "Conta criad com sucesso.")
              toastAlert("warning", "O Admin precisa validar sua conta.")
              setIsResgitered(true);
          }
         
       } catch (error) {
         toastAlert("error", error.response.data.message)
       }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    login(email, password)
  
  };

  if (isResgitered){
    navigate("/login")
    window.location.reload();
  }
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={SpiderLogo} width={123} height={123} alt="logo" />
      <Typography component="h1" variant="h5">
       VMS 
      </Typography>
      <ToastAlertContainer />
      <Box component="form" onSubmit={handleRegister}>
      <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nome"
          name="name"
          autoFocus
          onChange={(e) => onChange(e)}
        />

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

        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordCofirm"
          label="comfirme a senha"
          type="password"
          id="passwordCofirm"
          onChange={(e) => onChange(e)}

        />
    
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Registrar
        </Button>
        <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                 já tem conta? logar
                </Link>
              </Grid>
        </Grid>
      </Box>
      
    </Box>
  </Container>)

};

export default Register;
