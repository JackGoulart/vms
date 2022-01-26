import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { Button, FormControlLabel, Paper } from "@mui/material";
import DataService from "../services/data";

export const EditStatusFix = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(location.state.row.fix);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const updateRow = () => {
    const id = location.state.row.id;
    const payload = JSON.stringify({
      fix: checked,
    });
    DataService.updateStatusRow(id, payload);
    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
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
          <Box component="form" sx={{ "& .MuiTextField-root": { m: 1 } }}>
            <TextField
              margin="normal"
              contentEditable={false}
              fullWidth
              disabled={true}
              id="hostname"
              label="Asset hostname"
              name="hostname"
              value={location.state.row.asset_hostname}
            />

            <TextField
              margin="normal"
              contentEditable={false}
              fullWidth
              disabled={true}
              id="ip"
              label="Asset ip address"
              name="ip"
              value={location.state.row.asset_ip_address}
            />

            <TextField
              margin="normal"
              contentEditable={false}
              fullWidth
              disabled={true}
              id="title"
              multiline
              maxRows={4}
              label="Vulnerability title"
              name="title"
              value={location.state.row.vulnerability_title}
            />

            <TextField
              margin="normal"
              contentEditable={false}
              disabled={true}
              id="severity"
              label="Vulnerability severity"
              name="hostname"
              value={location.state.row.vulnerability_severity}
            />

            <TextField
              margin="normal"
              contentEditable={false}
              disabled={true}
              id="cvss"
              label="Vulnerability cvss"
              name="hostname"
              value={location.state.row.vulnerability_cvss}
            />
            <TextField
              margin="normal"
              contentEditable={false}
              disabled={true}
              type="date"
              id="date"
              label="Publication date"
              name="date"
              value={location.state.row.publication_date}
            />

            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Status"
            />

            <Button
              onClick={updateRow}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Salvar
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
