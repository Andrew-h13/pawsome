"use client";

import { Box, Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logoutUser } from "@/utils/api";

export default function Navbar() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleHome = () => {
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    } else {
    }
  }, []);

  const handleLogout = async () => {
    const success = await logoutUser();

    if (success) {
      localStorage.removeItem("token");

      router.push("/login");
    } else {
      console.log("Logout failed");
    }
  };

  return (
    <>
      <Grid2
        sx={{
          width: "100vw",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#111111",
          padding: "0 2rem",
          boxSizing: "border-box",
        }}
      >
        <Grid2
          container
          spacing={2}
          sx={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Grid2 size="auto">
            <Box>
              <Box style={{ color: "white" }}>
                <h1 onClick={handleHome} style={{ cursor: "pointer" }}>
                  PawsomeMatch
                </h1>
              </Box>
            </Box>
          </Grid2>
          <Grid2
            container
            columnSpacing={7}
            sx={{ alignItems: "center" }}
            size="auto"
          >
            <ul
              style={{
                color: "white",
                cursor: "pointer",
              }}
            >
              Contact
            </ul>
            <ul style={{ color: "white", cursor: "pointer" }}>About</ul>

            <ul
              style={{ color: "white", cursor: "pointer" }}
              onClick={handleLogin}
            >
              Login
            </ul>

            <ul
              style={{ color: "white", cursor: "pointer" }}
              onClick={handleLogout}
            >
              Log out
            </ul>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
