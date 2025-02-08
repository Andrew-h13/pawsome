"use client";

import { Grid2, Box, Button, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Splash() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const storedLoggedIn = Cookies.get("loggedIn") === "true";
    setLoggedIn(storedLoggedIn);

    if (storedLoggedIn) {
      const storedUserName = Cookies.get("UserName") || null;
      setUserName(storedUserName);
    }
  }, []);

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <Grid2
        size={{
          xs: 12,
          sm: 12,
          md: 12,
        }}
        sx={{
          position: "relative",
          height: "80vh",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/assets/test2.jpg"
            alt="hero"
            layout="fill"
            objectFit="cover"
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
              zIndex: 1,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",

              transform: isMobile
                ? "translate(-50%, 10%)"
                : "translate(-50%, 50%)",
              textAlign: "center",
              color: "white",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              fontWeight: "bold",
              maxWidth: "85%",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
              zIndex: 2,
              padding: { xs: "10px", sm: "20px" },
            }}
          >
            {!isLoggedIn ? (
              <>
                <h4 style={{ width: "90vw", transform: "translate(-5%, 0%)" }}>
                  Find Your Purrrfect Match and Unleash the Love
                </h4>
                <Box
                  sx={{
                    marginTop: 2,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    fontWeight: "normal",
                    Width: "100vw",
                    transform: "translate(0%, 0%)",
                  }}
                >
                  Explore our database of shelter dogs to discover your new best
                  friend
                </Box>
                <Link href="/login?mode=signup">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2d2d2d",
                      marginTop: 3,
                      padding: "12px 24px",
                      transform: "translate(0%,0%)",
                      fontSize: "1.1rem",
                      textTransform: "none",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "#444" },
                    }}
                  >
                    Join Us Today!
                  </Button>
                </Link>
              </>
            ) : (
              <h4
                style={{
                  width: isMobile ? "40vh" : "100vh",
                  padding: "1rem",
                  transform: isMobile
                    ? "translate(-5%, 100%)"
                    : "translate(-10%, 100%)",
                }}
              >
                Welcome back, {userName}! Let’s find your purrrfect match!
              </h4>
            )}
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
}
