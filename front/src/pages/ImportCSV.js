import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DataService from "../services/data";
import { green } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";



const ImportCSV = () => {
  const navigate = useNavigate();
  
  const [file, setFile] = useState();

  const selectFile = (event) => {
    setFile(event.target.files);
  };
  
  const uploadSeletedFile = () =>{
      console.log(file[0])
      DataService.uploadCsvFile(file[0])
      navigate('/dashboard')
      window.location.reload();
  }

  return (
    <Box
      sx={{ backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Paper
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        > 
   
      <Box>
        <Grid container  display="flex"
       justifyContent="center" >
          <Grid item >
                  
         <input accept="text/csv" onChange={selectFile}  id="input-file" type="file" style={{ display: 'none' }} />
         <label htmlFor="input-file">
           <Button  component="span"> 
              < UploadFileIcon  color='primary'  fontSize="large" />
              <Typography> Selecione o arquivo</Typography>
            </Button>
        </label>
          <Grid item display="flex"
       justifyContent="center"> 
         {file 
            ?  <Typography>{file[0].name}  <CheckCircleIcon style={{ fill: green[500] }} /></Typography>
            : <Typography>não selecionado.</Typography> }
          </Grid>
          </Grid> 
         
          </Grid>
          <Grid display="flex"
                justifyContent="center" >
              <Button
                onClick={uploadSeletedFile}
                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                
              Salvar
              </Button>
          </Grid>
        </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ImportCSV