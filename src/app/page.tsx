import Navbar from "@/layouts/ui/navbar";
import Splash from "@/layouts/ui/splash";
import Footer from "@/layouts/ui/footer";
import { Box } from "@mui/material";
import DogList from "@/layouts/ui/dogList";
import Search from "@/layouts/ui/searchSection";
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
        <DogList />
        <Box sx={{ flex: 1 }} /> <Footer />
      </Box>
    </>
  );
}
