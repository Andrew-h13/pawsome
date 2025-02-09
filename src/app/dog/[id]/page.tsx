"use client";

import Navbar from "@/layouts/ui/navbar";
import { Avatar, Box, Grid2, Typography, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDogs, fetchLocations } from "@/utils/api";
import { Dog, Location } from "@/models/types";
import Footer from "@/layouts/ui/footer";

export default function DogProfile() {
  const { id } = useParams();
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);

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
        const zipCodes = [dog?.zip_code];
        const locationData = await fetchLocations(zipCodes);
        setLocations(locationData);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };

    fetchLocationData();
  }, [dog]);

  if (loading) return <p>Loading...</p>;
  if (!dog) return <p>Dog not found</p>;

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Avatar
                alt={dog?.name || "Dog Image"}
                src={dog?.img || ""}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  padding: "2rem",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                >
                  {dog?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#FF4081",
                    marginBottom: "1rem",
                  }}
                >
                  {dog?.breed}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ marginBottom: "1rem" }}
                >
                  <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                    Age: {dog?.age} years
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                    Location: {dog?.zip_code}
                  </Typography>
                </Stack>
              </Paper>
            </Grid2>
          </Grid2>

          <Box sx={{ marginTop: "3rem" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              Nearby Locations:
            </Typography>
            {locations.length > 0 ? (
              locations.map((location, index) => (
                <Paper
                  key={index}
                  sx={{
                    padding: "1rem",
                    marginBottom: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Typography variant="body2">
                    {location.city}, {location.state} (ZIP: {location.zip_code})
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.9rem", color: "#666" }}
                  >
                    {location.county} | Latitude: {location.latitude} |
                    Longitude: {location.longitude}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No locations found.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }} /> <Footer />
    </>
  );
}
