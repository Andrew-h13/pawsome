import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box } from "@mui/material";

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
        <p>Hi this is the about page Coming Soon.....</p>
        <Box sx={{ flex: 1 }} /> <Footer />
      </Box>
    </>
  );
}
