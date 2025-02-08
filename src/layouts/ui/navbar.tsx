"use client";

import {
  Box,
  Grid2,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutUser } from "@/utils/api";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const storedLoggedIn = Cookies.get("loggedIn") === "true";
    setLoggedIn(storedLoggedIn);
  }, []);

  const handleLogin = () => router.push("/login");
  const handleHome = () => router.push("/");
  const handleFavorite = () => router.push("/favorite");
  const handleAbout = () => router.push("/about");
  const handleContact = () => router.push("/contact");

  const handleLogout = async () => {
    const success = await logoutUser();

    if (success && typeof window !== "undefined") {
      Cookies.remove("loggedIn");
      setLoggedIn(false);
      router.push("/login");
    } else {
      console.log("Logout failed");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#111",
        padding: "0 2rem",
        boxSizing: "border-box",
        borderRadius: "10px",
      }}
    >
      {isMobile ? (
        <Image
          src="/assets/logos/logo_transparent.png"
          alt="PawsomeMatch Logo"
          width={100}
          height={100}
          onClick={handleHome}
          style={{
            cursor: "pointer",
            borderRadius: "25px",
            marginLeft: "-20px",
            marginTop: "-10px",
          }}
        />
      ) : (
        <h1 onClick={handleHome} style={{ cursor: "pointer" }}>
          PawsomeMatch
        </h1>
      )}

      <Grid2 container spacing={4} sx={{ alignItems: "center", width: "auto" }}>
        {loggedIn && (
          <IconButton
            sx={{ color: "white" }}
            aria-label="favorite"
            onClick={handleFavorite}
          >
            {isMobile ? <FavoriteIcon /> : <Typography>Favorite</Typography>}
          </IconButton>
        )}

        <IconButton
          sx={{ color: "white" }}
          aria-label="contact"
          onClick={handleContact}
        >
          {isMobile ? <ContactMailIcon /> : <Typography>Contact</Typography>}
        </IconButton>

        <IconButton
          sx={{ color: "white" }}
          aria-label="about"
          onClick={handleAbout}
        >
          {isMobile ? <InfoIcon /> : <Typography>About</Typography>}
        </IconButton>

        {!loggedIn ? (
          <IconButton
            sx={{ color: "white" }}
            aria-label="login"
            onClick={handleLogin}
          >
            {isMobile ? <LoginIcon /> : <Typography>Login</Typography>}
          </IconButton>
        ) : (
          <IconButton
            sx={{ color: "white" }}
            aria-label="logout"
            onClick={handleLogout}
          >
            {isMobile ? <LogoutIcon /> : <Typography>Log out</Typography>}
          </IconButton>
        )}
      </Grid2>
    </Box>
  );
}
