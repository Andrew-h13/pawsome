"use client";
import Navbar from "@/layouts/ui/navbar";
import Splash from "@/layouts/ui/splash";
import Footer from "@/layouts/ui/footer";
import { Box } from "@mui/material";
import DogList from "@/layouts/ui/dogList";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = Cookies.get("loggedIn") === "true";
    setLoggedIn(storedLoggedIn);
  }, []);

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
        {loggedIn && <DogList />}
        <Box sx={{ flex: 1 }} /> <Footer />
      </Box>
    </>
  );
}
