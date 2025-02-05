import Navbar from "@/layouts/ui/navbar";
import Splash from "@/layouts/ui/splash";
import Footer from "@/layouts/ui/footer";
import Search from "@/layouts/ui/searchSection";
import { Box } from "@mui/material";
export default function Home() {
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
        <Splash />
        <Search />
        <Box sx={{ flex: 1 }} /> <Footer />
      </Box>
    </>
  );
}
