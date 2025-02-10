import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box, Typography, Container, Stack } from "@mui/material";

export default function Terms() {
  return (
    <>
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
            variant="h4"
            sx={{
              marginBottom: "2rem",
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Terms and Conditions
          </Typography>

          <Stack spacing={3}>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "#fff",
                fontSize: "1.1rem",
                textAlign: "justify",
              }}
            >
              Welcome to PawsomeMatch! These Terms and Conditions outline the
              rules and regulations for the use of our services. By accessing or
              using our website and services, you agree to comply with these
              terms. If you do not agree with these terms, please refrain from
              using our services.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "#fff",
                fontSize: "1.1rem",
                textAlign: "justify",
              }}
            >
              PawsomeMatch reserves the right to modify or update these terms at
              any time. It is your responsibility to review these terms
              regularly to ensure you are aware of any changes. Your continued
              use of the services after any modifications will constitute your
              acceptance of the updated terms.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "#fff",
                fontSize: "1.1rem",
                textAlign: "justify",
              }}
            >
              For more information on how we collect, use, and protect your
              personal data, please refer to our Privacy Policy.
            </Typography>
          </Stack>
        </Container>

        <Footer />
      </Box>
    </>
  );
}
