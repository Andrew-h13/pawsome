"use client";

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "@/layouts/ui/navbar";
import Footer from "@/layouts/ui/footer";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { loginUser } from "@/utils/api";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const success = await loginUser(name, email);
    if (success) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("UserName", name);
      router.push("/");
    } else {
      setError("Login Failed, Please Check you Credentials");
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
              animate={{ x: "0%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "50%",
                height: "500px",
                marginTop: "-100px",
                marginLeft: "-375px",
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
              animate={{ x: "0%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                width: "50%",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "500px",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ gap: "20px" }}
              >
                <Typography
                  variant="h4"
                  color="#2d2d2d"
                  sx={{ marginBottom: "20px" }}
                >
                  {"Sign In"}
                </Typography>
                <FormControl fullWidth sx={{ gap: "10px" }}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  {error && <Typography color="error">{error}</Typography>}
                  <Button type="submit" variant="contained">
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </FormControl>
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
