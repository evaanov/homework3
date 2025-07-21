import './App.css'
import TaskList from './pages/TaskList/TaskList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskDetail from './pages/TaskDetails/TaskDetails'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: grey[700], 
        light: grey[600], 
        dark: grey[900], 
        contrastText: '#ffffff', 
      },
      secondary: {
        main: purple[500], 
        light: purple[300], 
        dark: purple[700], 
        contrastText: '#ffffff',
      },
      background: {
        default: grey[900], 
        paper: grey[900], 
      },
      text: {
        primary: '#ffffff', 
        secondary: 'rgba(255, 255, 255, 0.7)', 
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8 , 
          },
        },
      },
    },
  });
  

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/task/:id' element={<TaskDetail />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
