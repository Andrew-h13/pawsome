import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box } from "@mui/material";

export default function Contact() {
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
        <p>This is the Contact Us Page coming soon...</p>
        <Box sx={{ flex: 1 }} /> <Footer />
      </Box>
    </>
  );
}
