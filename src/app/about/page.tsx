import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box, Typography, Stack, Container } from "@mui/material";

export default function About() {
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
            About Us
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
              PawsomeMatch is a platform designed to connect dog lovers with
              adoptable dogs. Our mission is to help people find their perfect
              match by providing an easy-to-use, user-friendly experience to
              browse, discover, and adopt dogs from local shelters and rescues.
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
              We believe that every dog deserves a loving home, and our platform
              aims to make that a reality. Whether you&apos;re looking for your
              first dog or an experienced owner, PawsomeMatch is here to help
              guide you through the adoption process and find the perfect
              companion for your lifestyle.
            </Typography>
          </Stack>
        </Container>

        <Footer />
      </Box>
    </>
  );
}
