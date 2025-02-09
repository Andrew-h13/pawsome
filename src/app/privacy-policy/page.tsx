import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box, Typography, Container, Stack } from "@mui/material";

export default function Privacy() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <Container
          sx={{
            padding: "4rem 2rem",
            flex: 1,
            backgroundColor: "#111",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            maxWidth: "1200px",
            marginTop: "3rem",
            marginLeft: "auto",
            marginRight: "auto",
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
            Privacy Policy
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
              Your privacy is important to us. This Privacy Policy outlines how
              we collect, use, and protect your personal information. By using
              our website and services, you consent to the practices described
              in this policy.
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
              We collect personal information such as your name, email address,
              and contact information when you register or interact with our
              services. This information is used to provide better service, keep
              you informed, and improve your experience.
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
              We are committed to safeguarding your privacy and take appropriate
              security measures to protect your data. For further details,
              please refer to our full Privacy Policy.
            </Typography>
          </Stack>
        </Container>

        <Footer />
      </Box>
    </>
  );
}
