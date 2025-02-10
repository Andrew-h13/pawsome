import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box, Typography, Stack, Grid2, Container } from "@mui/material";

export default function Contact() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Three+Little+Pitties+Rescue,509+Rustic+Ln,Friendswood,TX+77546`;

  return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #222, #111)",
          color: "#ddd",
        }}
      >
        <Container
          sx={{
            flex: 1,
            padding: { xs: "1.5rem 1rem", md: "3rem 2rem" },
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            margin: { xs: "1.5rem auto", md: "2rem auto" },
            maxWidth: { xs: "95%", md: "800px", lg: "1200px" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginTop: "30px",
              marginBottom: "2rem",
              fontWeight: "bold",
              color: "#FF4081",
              textAlign: "center",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Contact Us
          </Typography>

          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#FF4081" }}
                >
                  Get in Touch
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Should you have any inquiries or require assistance, please
                  feel free to reach out to us at:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#FF4081" }}
                >
                  contact@pawsomematch.com
                </Typography>

                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  If you are considering adopting a pet, we encourage you to
                  explore Three Little Pitties Rescue for more information.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Visit their website:{" "}
                  <a
                    href="https://www.threelittlepittiesrescue.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#FF4081",
                      fontWeight: "bold",
                    }}
                  >
                    https://www.threelittlepittiesrescue.org/
                  </a>
                </Typography>
              </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#FF4081", mb: 2 }}
              >
                Three Little Pitties Rescue Location
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "250px", md: "300px" },
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: "none", borderRadius: "8px" }}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </Box>
            </Grid2>
          </Grid2>
        </Container>

        <Footer />
      </Box>
    </>
  );
}
