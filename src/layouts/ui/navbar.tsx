"use client";

import { Box, Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleHome = () => {
    router.push("/");
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
            <Link href="/login?mode=login">
              <ul
                style={{ color: "white", cursor: "pointer" }}
                onClick={handleLogin}
              >
                Login
              </ul>
            </Link>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
