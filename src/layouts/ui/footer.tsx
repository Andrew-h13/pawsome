import { Box, Grid2 } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#111111",
          color: "white",
          padding: "2rem 0",
          textAlign: "center",
        }}
      >
        <Grid2
          container
          sx={{
            width: "100vw",
            margin: "0 auto",
            padding: "0 2rem",
            boxSizing: "border-box",
          }}
        >
          <Grid2
            container
            rowSpacing={1}
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{ mb: 2 }}
          >
            <h2>Stay In Touch With Us</h2>
            <input
              type="email"
              placeholder="Enter Your Email Address"
              style={{
                padding: "0.5rem",
                width: "100%",
                marginBottom: "1rem",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} sx={{ mb: 2 }}>
            <h3>About Us</h3>
            <ul style={{ padding: "1rem" }}>
              <ul>Privacy policy</ul>
              <ul>Terms of use</ul>
            </ul>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} sx={{ mb: 2 }}>
            <h3>Join Our Community</h3>
            <ul style={{ padding: "1rem" }}>
              <ul>Doggy Care Tips</ul>
            </ul>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} sx={{ mb: 2 }}>
            <h3>FAQ</h3>
            <ul style={{ padding: "1rem" }}>
              <ul>Contact Us</ul>
              <ul>Customer Support</ul>
            </ul>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
}
