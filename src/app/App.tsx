import './App.css'
import TaskList from '../pages/TaskList/TaskList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import TaskForm from '../pages/TaskForm/TaskForm'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';
import { store } from '../entities/store/store';
import { initializeTasks } from '../entities/utils/storage';
import { useEffect } from 'react';

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

  useEffect(() => { 
    initializeTasks()
  }, [])
  

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/task/:id' element={<TaskForm/>} />
            <Route path='/task/new' element={<TaskForm />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
