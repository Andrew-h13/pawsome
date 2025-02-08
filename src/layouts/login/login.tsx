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
      Cookies.set("loggedIn", "true", { expires: 7 });
      Cookies.set("UserName", name, { expires: 7 });
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
            padding: isMobile ? "1rem" : "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#fff",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              width: isMobile ? "90%" : "1000px",
              height: isMobile ? "auto" : "600px",
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
                width: isMobile ? "80%" : "50%",
                height: "auto",
                marginTop: isMobile ? "10px" : "5px",
                marginLeft: isMobile ? "0" : "-375px",
              }}
            >
              <Image
                src={"/assets/logindog.jpg"}
                alt="hero"
                width={isMobile ? 0 : 500}
                height={isMobile ? 0 : 605}
                style={{ borderRadius: "20px" }}
              />
            </motion.div>

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "0%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                width: isMobile ? "100%" : "50%",
                padding: isMobile ? "1rem" : "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: isMobile ? "0" : "500px",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ gap: "20px", width: "100%" }}
              >
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  color="#2d2d2d"
                  sx={{ marginBottom: "20px", textAlign: "center" }}
                >
                  Sign In
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
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
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
