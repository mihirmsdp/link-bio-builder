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

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithGitHub } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { data, error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Show success message
    setSuccess(true);
    setLoading(false);

    // Note: User needs to verify email before logging in
    // For now, we'll redirect to login after 3 seconds
    setTimeout(() => {
      navigate("/login");
    }, 3000);
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

  if (success) {
    return (
      <Box>
        <Alert severity="success" sx={{ mb: 2 }}>
          Account created successfully! Please check your email to verify your
          account.
        </Alert>
        <Typography variant="body2" color="text.secondary" align="center">
          Redirecting to login...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
        Create Account
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" mb={3}>
        Start building your link-in-bio page
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
          sx={{ mb: 2 }}
          autoComplete="new-password"
          helperText="At least 6 characters"
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3 }}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? "Creating account..." : "Sign Up"}
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
          Already have an account?{" "}
          <MuiLink component={Link} to="/login" underline="hover">
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};
