import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box, Typography, Stack, Button, Grid2 } from "@mui/material";

export default function Contact() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Three+Little+Pitties+Rescue,509+Rustic+Ln,Friendswood,TX+77546`;

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
            Contact Us
          </Typography>

          <Grid2 container spacing={4}>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Email Us:
                </Typography>
                <Typography variant="body1">
                  If you have any questions or need assistance, please reach out
                  to us at:
                </Typography>
                <Typography variant="body1" sx={{ color: "blue" }}>
                  contact@pawsomematch.com
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Send a Message
                </Button>
              </Stack>
            </Grid2>

            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Our Location:
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "8px",
                }}
              >
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "8px" }}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </Box>
            </Grid2>
          </Grid2>
        </Box>

        <Footer />
      </Box>
    </>
  );
}
