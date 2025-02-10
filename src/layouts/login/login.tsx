"use client";

import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "@/layouts/ui/navbar";
import Footer from "@/layouts/ui/footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/utils/api";
import Cookies from "js-cookie";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const success = await loginUser(name, email);
    if (success) {
      Cookies.set("loggedIn", "true", { expires: 1 / 24 });
      Cookies.set("UserName", name, { expires: 1 / 24 });
      router.push("/");
    } else {
      setError("Login Failed, Please Check your Credentials");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: isMobile ? "90%" : "1000px",
            height: isMobile ? "auto" : "550px",
            borderRadius: "20px",
            overflow: "hidden",
            transition: "all 0.5s ease-in-out",
            border: "4px solid black",
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              width: isMobile ? "100%" : "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: isMobile ? "1rem" : "2rem",
            }}
          >
            <Image
              src={"/assets/logindog.jpg"}
              alt="hero"
              width={isMobile ? 400 : 500}
              height={isMobile ? 350 : 500}
              style={{
                borderRadius: "20px",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              width: isMobile ? "100%" : "50%",
              padding: isMobile ? "2rem" : "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                color="#2d2d2d"
                sx={{
                  marginBottom: isMobile ? "10px" : "20px",
                  textAlign: "center",
                }}
              >
                Sign In
              </Typography>
              <FormControl fullWidth sx={{ gap: "10px" }}>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#FF4081",
                    "&:hover": { backgroundColor: "#E91E63" },
                  }}
                >
                  {loading ? "Logging in..." : "Get Started"}
                </Button>
              </FormControl>
            </Box>
          </motion.div>
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "1rem",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <Footer />
      </Box>
    </>
  );
}
