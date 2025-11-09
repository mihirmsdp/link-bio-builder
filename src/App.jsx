import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
          }}>
            <Typography variant="h3" color="primary">
              🚀 Link Bio Builder - Setup Complete!
            </Typography>
          </Box>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;