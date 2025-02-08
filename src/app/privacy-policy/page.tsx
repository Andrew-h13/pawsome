import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box } from "@mui/material";

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
        <p>Hi this is the Privacy Policy page Coming Soon.....</p>
        <Box sx={{ flex: 1 }} /> <Footer />
      </Box>
    </>
  );
}
