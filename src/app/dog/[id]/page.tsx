"use client";

import Navbar from "@/layouts/ui/navbar";
import {
  Box,
  Grid2,
  Typography,
  Paper,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDogs, fetchLocations } from "@/utils/api";
import { Dog, Location } from "@/models/types";
import Footer from "@/layouts/ui/footer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";

export default function DogProfile() {
  const { id } = useParams();
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    async function fetchDog() {
      if (!id) return;

      try {
        const dogId = Array.isArray(id) ? id[0] : id;
        const data = await getDogs([dogId]);
        setDog(data ? data[0] : null);
      } catch (error) {
        console.error("Failed to fetch dog data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDog();
  }, [id]);

  useEffect(() => {
    if (!dog?.zip_code) return;

    const fetchLocationData = async () => {
      try {
        const zipCodes = [dog.zip_code];
        const locationData = await fetchLocations(zipCodes);
        setLocations(locationData);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };

    fetchLocationData();
  }, [dog]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#FF4081" }} />
      </Box>
    );

  if (!dog) return <p>Dog not found</p>;

  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: "#111111", minHeight: "100vh" }}>
        <Box
          sx={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: isMobile ? "1rem" : "2rem",
          }}
        >
          <Link href="/" passHref>
            <IconButton sx={{ color: "#FF4081", mb: 2 }}>
              <ArrowBackIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                Back to Search
              </Typography>
            </IconButton>
          </Link>

          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: "500px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
                  "&:hover": {
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <Image
                  src={dog.img || "/placeholder-dog.jpg"}
                  alt={dog.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  padding: "2rem",
                  borderRadius: "16px",
                  backgroundColor: "#2d2d2d",
                  color: "white",
                  height: "100%",
                }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        color: "#FF4081",
                        fontSize: isMobile ? "2rem" : "3rem",
                      }}
                    >
                      {dog.name}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2, color: "#cccccc" }}>
                      {dog.breed}
                    </Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 16px",
                          backgroundColor: "#444444",
                          borderRadius: "8px",
                        }}
                      >
                        <CakeIcon
                          sx={{ fontSize: "1.5rem", mr: 1, color: "#FF4081" }}
                        />
                        <Typography variant="body1">
                          {dog.age} years old
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 16px",
                          backgroundColor: "#444444",
                          borderRadius: "8px",
                        }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: "1.5rem", mr: 1, color: "#FF4081" }}
                        />
                        <Typography variant="body1">
                          ZIP: {dog.zip_code}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="h5" sx={{ mb: 2, color: "#FF4081" }}>
                      <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      Location Details
                    </Typography>
                    {locations.length > 0 ? (
                      locations.map((location, index) => (
                        <Box
                          key={index}
                          sx={{
                            backgroundColor: "#444444",
                            borderRadius: "8px",
                            padding: "1rem",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {location.city}, {location.state}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#cccccc" }}>
                            {location.county} County | ZIP: {location.zip_code}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#999999", mt: 1 }}
                          >
                            Coordinates: {location.latitude},
                            {location.longitude}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                        Location information not available
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Paper>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
