import { Box, Typography, Button, Container } from "@mui/material";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Welcome, {user?.email}!
        </Typography>
        <Button variant="outlined" onClick={handleSignOut} sx={{ mt: 2 }}>
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};
