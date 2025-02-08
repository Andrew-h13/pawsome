import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import { Box } from "@mui/material";

export default function Favorites() {
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
        <p>Hi this is the favorite page Coming Soon.....</p>
        <Box sx={{ flex: 1 }} /> <Footer />
      </Box>
    </>
  );
}
