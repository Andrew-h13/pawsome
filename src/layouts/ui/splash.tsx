"use client";

import { Grid2, Box, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Splash() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100vw",
          height: "700px",
          overflow: "hidden",
        }}
      >
        <Grid2
          size={{
            xs: 3,
            sm: 6,
            md: 12,
          }}
          sx={{
            position: "relative",
            height: "100%",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/assets/test2.jpg"
              alt="hero"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, 20%)",
                textAlign: "center",
                color: "white",
                fontSize: "2rem",
                fontWeight: "bold",
                maxWidth: "80%",
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              <h4>Unleash the love and find your perfect match</h4>
              <Link href="/login?mode=signup">
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "#2d2d2d",
                    marginTop: 2,
                    padding: "12px 24px",
                    fontSize: "1.1rem",
                    textTransform: "none",
                    borderRadius: "20px",
                  }}
                >
                  Sign Up
                </Button>
              </Link>

              <Box
                sx={{
                  marginTop: 3,
                  fontSize: "1.1rem",
                  fontWeight: "normal",
                }}
              >
                Browse through our database of shelter dogs to find your match
              </Box>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
