import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Grid,
} from "@mui/material";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user !== null) {
      navigate("/todos");
    }
  }, []);
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 25 }}>
        <Typography variant="h2" gutterBottom textAlign={"center"}>
          Welcome to TodoList!
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3 }}
          textAlign={"center"}
        >
          Keeping Your Tasks Organized
        </Typography>
        <Typography paragraph textAlign={"center"}>
          TodoList is a powerful tool designed to help you keep track of your
          daily tasks. With an easy-to-use interface, you can add, edit, and
          delete tasks as your priorities change throughout the day. Whether
          you&rsquo;re managing work assignments, organizing personal projects,
          or planning your grocery list, TodoList makes it easy to stay on top
          of everything.
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 15 }}>
        <Typography variant="h4" gutterBottom align="center" mb={10}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Easy to Use
              </Typography>
              <Typography>
                Our intuitive design makes managing tasks simpler than ever.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Real-Time Sync
              </Typography>
              <Typography>
                Your tasks are synced across all devices instantly.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Customizable
              </Typography>
              <Typography>
                Customize your task lists to suit your workflow.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Get in Touch Section */}
      <Container maxWidth="lg" sx={{ mb: 15 }}>
        <Typography variant="h4" gutterBottom align="center" mb={10}>
          Get in Touch
        </Typography>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item md={6}>
            <Box
              component="img"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "3px",
              }}
              src="/assets/getInTouch.png" //
              alt="A relevant description"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ mt: -1.5 }}
            >
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, display: "block", ml: "auto", py: 1.5 }}
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Home;
