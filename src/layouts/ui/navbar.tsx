"use client";

import { Box, Grid2, Typography, useMediaQuery } from "@mui/material";
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
        <Typography sx={{ color: "white", cursor: "pointer" }}>
          Contact
        </Typography>
        <Typography sx={{ color: "white", cursor: "pointer" }}>
          About
        </Typography>
        {!loggedIn ? (
          <Typography
            sx={{ color: "white", cursor: "pointer" }}
            onClick={handleLogin}
          >
            Login
          </Typography>
        ) : (
          <Typography
            sx={{ color: "white", cursor: "pointer" }}
            onClick={handleLogout}
          >
            Log out
          </Typography>
        )}
      </Grid2>
    </Box>
  );
}
