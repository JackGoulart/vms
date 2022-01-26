import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import { EditStatusFix } from './pages/EditStatusFix';
import ImportCSV from './pages/ImportCSV';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary : {
      main : '#d35400'
    } 
  },
})

const  App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path={"/"} element={<Login />} />
        <Route exact path={"/login"} element={<Login />} />
        <Route exact path={"/register"} element={<Register />} />
        <Route exact path={"/dashboard"} element={<Dashboard />} />
        <Route exact path={"/fix"} element={<EditStatusFix />} />
        <Route exact path={"/import"} element={<ImportCSV />} />
      </Routes>
    </ThemeProvider>
  )
    
}

export default App;
