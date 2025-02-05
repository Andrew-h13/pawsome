"use client";

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "@/layouts/ui/navbar";
import Footer from "@/layouts/ui/footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [isSignUp, setIsSignUp] = useState(mode === "signup");

  useEffect(() => {
    setIsSignUp(mode === "signup");
  }, [mode]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#fff",
              width: "1000px",
              height: "600px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
              overflow: "hidden",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isSignUp ? "100%" : "0%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "50%",
                height: "500px",
                marginTop: "-100px",
                marginLeft: isSignUp ? "-620px" : "-375px",
              }}
            >
              <Image
                src={"/assets/logindog.jpg"}
                alt="hero"
                width={500}
                height={605}
                style={{ borderRadius: "20px" }}
              />
            </motion.div>

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isSignUp ? "-100%" : "0%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                width: "50%",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: isSignUp ? "500px" : "500px",
              }}
            >
              <Box sx={{ gap: "20px" }}>
                <Typography
                  variant="h4"
                  color="#2d2d2d"
                  sx={{ marginBottom: "20px" }}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <FormControl fullWidth sx={{ gap: "10px" }}>
                  <TextField label="Email" variant="outlined" required />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                  />
                  {isSignUp && (
                    <TextField
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      required
                    />
                  )}
                  <Button variant="contained">
                    {isSignUp ? "Sign Up" : "Login"}
                  </Button>
                </FormControl>
                <Button
                  onClick={() => setIsSignUp(!isSignUp)}
                  sx={{ marginTop: "1rem" }}
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Box>
        <Box sx={{ width: "100%", backgroundColor: "gray" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
