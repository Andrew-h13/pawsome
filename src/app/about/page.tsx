import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box, Typography, Stack, Container } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #222, #111)",
        color: "#ddd",
      }}
    >
      <Navbar />

      <Container
        sx={{
          flex: 1,
          padding: { xs: "1.5rem 1rem", md: "4rem 2rem" },
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
          borderRadius: "12px",
          maxWidth: { xs: "100%", sm: "90%", md: "800px", lg: "1000px" },
          margin: { xs: "2rem auto", md: "3rem auto" },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginTop: "50px",
            marginBottom: "2rem",
            fontWeight: "bold",
            color: "#FF4081",
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          About Us
        </Typography>

        <Stack spacing={3}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: "90%",
              margin: "0 auto",
            }}
          >
            🐾 <strong>PawsomeMatch</strong> is a platform designed to connect
            dog lovers with adoptable dogs. Our mission is to help people find
            their perfect match by providing a simple, user-friendly way to
            browse, discover, and adopt dogs from local shelters and rescues.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: "90%",
              margin: "0 auto",
            }}
          >
            ❤️ We believe that every dog deserves a loving home. Whether
            you&apos;re looking for your first dog or you&apos;re an experienced
            pet owner, <strong>PawsomeMatch</strong> is here to guide you
            through the adoption process and help you find the perfect companion
            for your lifestyle.
          </Typography>
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
}
