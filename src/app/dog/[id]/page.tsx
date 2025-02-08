"use client";

import Navbar from "@/layouts/ui/navbar";
import { Avatar, Box, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDogs, fetchLocations } from "@/utils/api";
import { Dog, Location } from "@/models/types";

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
      } finally {
      }
    };

    fetchLocationData();
  }, [dog]);

  if (loading) return <p>Loading...</p>;
  if (!dog) return <p>Dog not found</p>;

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", width: "100vw", minHeight: "100vh" }}>
        <Box>
          <Grid2 container spacing={2}>
            <Grid2>
              <Avatar
                alt={dog?.name || "Dog Image"}
                src={dog?.img || ""}
                sx={{ width: 250, height: 250 }}
              />
            </Grid2>
            <Grid2>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
              >
                {dog?.name}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
                {dog?.breed}
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
              >
                {dog?.age} years old
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                Location: {dog?.zip_code}
              </Typography>
            </Grid2>
          </Grid2>

          <Box sx={{ marginTop: "1rem" }}>
            <Typography variant="h6">Nearby Locations:</Typography>
            {locations.length > 0 ? (
              locations.map((location, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  {location.city}, {location.state} (ZIP: {location.zip_code})
                  {location.county}
                  {location.latitude} {location.longitude}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                No locations found.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
