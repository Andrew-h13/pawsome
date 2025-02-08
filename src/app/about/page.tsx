import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box, Typography, Stack } from "@mui/material";

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

        <Box
          sx={{
            padding: "2rem",
            flex: 1,
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
            About Us
          </Typography>

          <Stack spacing={2}>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              PawsomeMatch is a platform designed to connect dog lovers with
              adoptable dogs. Our mission is to help people find their perfect
              match by providing an easy-to-use, user-friendly experience to
              browse, discover, and adopt dogs from local shelters and rescues.
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              We believe that every dog deserves a loving home, and our platform
              aims to make that a reality. Whether you're looking for your first
              dog or an experienced owner, PawsomeMatch is here to help guide
              you through the adoption process and find the perfect companion
              for your lifestyle.
            </Typography>
          </Stack>
        </Box>

        <Footer />
      </Box>
    </>
  );
}
