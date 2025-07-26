import './App.css'
import TaskList from '@pages/TaskList/TaskList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import TaskForm from '@pages/TaskForm/TaskForm'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';
import { store } from '@store/store';
import { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useTasks } from '@store/useTask';

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

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


  const { error, fetchTasks } = useTasks();
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => { 
    setLoading(true)
    fetchTasks();
    setLoading(false)
  }, [fetchTasks]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <div>Error: {error}</div>
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/task/:id' element={<TaskForm/>} />
          <Route path='/task/new' element={<TaskForm />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default AppWrapper;