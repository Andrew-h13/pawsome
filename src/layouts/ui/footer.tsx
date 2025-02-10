import { Box, Grid2, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#111111",
        color: "white",
        padding: "1rem 0",
        textAlign: "center",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="body2">© 2025 PawsomeMatch</Typography>

        <Grid2 container justifyContent="center" spacing={1}>
          <Grid2>
            <Link
              href="/contact"
              sx={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="body2">Contact Us</Typography>
            </Link>
          </Grid2>
          <Grid2>
            <Link href="/about" sx={{ color: "white", textDecoration: "none" }}>
              <Typography variant="body2">About Us</Typography>
            </Link>
          </Grid2>
          <Grid2>
            <Link
              href="/privacy-policy"
              sx={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="body2">Privacy Policy</Typography>
            </Link>
          </Grid2>
          <Grid2>
            <Link
              href="/terms-conditions"
              sx={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="body2">Terms and Conditions</Typography>
            </Link>
          </Grid2>
        </Grid2>
      </Stack>
    </Box>
  );
}
