import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithGitHub } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Navigate to dashboard on success
    navigate("/dashboard");
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };

  const handleGitHubSignIn = async () => {
    setError("");
    const { error } = await signInWithGitHub();
    if (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
        Welcome Back
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" mb={3}>
        Sign in to your account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          autoComplete="email"
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <Divider sx={{ my: 3 }}>OR</Divider>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
        sx={{ mb: 1 }}
      >
        Continue with Google
      </Button>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={handleGitHubSignIn}
      >
        Continue with GitHub
      </Button>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <MuiLink component={Link} to="/signup" underline="hover">
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};
