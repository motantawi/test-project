import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        p: 3,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} TodoList. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
