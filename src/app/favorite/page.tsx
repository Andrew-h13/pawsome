"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid2,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { fetchLocations, getDogs } from "@/utils/api";
import { Dog, Location } from "@/models/types";
import { getMatchedDog } from "@/utils/api";

export default function Favorites() {
  const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [location, setLocation] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    setFavoriteDogIds(favorites);
  }, []);

  useEffect(() => {
    async function fetchFavorites() {
      if (favoriteDogIds.length === 0) {
        setLoading(false);
        return;
      }
      try {
        const dogs = await getDogs(favoriteDogIds);
        setFavoriteDogs(dogs);
      } catch (error) {
        console.error("Error fetching favorite dogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, [favoriteDogIds]);

  const toggleFavorite = (dogId: string) => {
    const updatedFavorites = favoriteDogIds.includes(dogId)
      ? favoriteDogIds.filter((id) => id !== dogId)
      : [...favoriteDogIds, dogId];
    setFavoriteDogIds(updatedFavorites);
    Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 30 });
    setFavoriteDogs(favoriteDogs.filter((d) => d.id !== dogId));
  };

  useEffect(() => {
    const fetchMatchedDog = async () => {
      if (favoriteDogIds.length === 0) return;
      try {
        const matchedDogId = await getMatchedDog(favoriteDogIds);
        if (!matchedDogId) {
          console.error("No matched dog ID returned.");
          return;
        }
        const [matchedDogDetails] = await getDogs([matchedDogId]);
        if (!matchedDogDetails) {
          console.error("No details found for matched dog ID:", matchedDogId);
          return;
        }
        setMatchedDog(matchedDogDetails);
      } catch (error) {
        console.error("Error fetching matched dog:", error);
      }
    };
    fetchMatchedDog();
  }, [favoriteDogIds]);

  useEffect(() => {
    if (favoriteDogs.length === 0 || !favoriteDogs[0].zip_code) return;
    const fetchLocationData = async () => {
      try {
        const zipCodes = [favoriteDogs[0].zip_code];
        const locationData = await fetchLocations(zipCodes);
        setLocation(locationData);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };
    fetchLocationData();
  }, [favoriteDogs]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#111",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "1200px" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "2rem",
            }}
          >
            Your Favorites
          </Typography>
          {loading ? (
            <Typography
              variant="body1"
              sx={{ color: "#fff", textAlign: "center" }}
            >
              Loading...
            </Typography>
          ) : favoriteDogs.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ color: "#fff", textAlign: "center" }}
            >
              You have no favorite dogs.
            </Typography>
          ) : (
            <>
              <Grid2 container spacing={3} justifyContent="center">
                {favoriteDogs.map((dog) => (
                  <Grid2 key={dog.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Card
                      sx={{
                        backgroundColor: "#333",
                        color: "#fff",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                        overflow: "hidden",
                        position: "relative",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.4)",
                        },
                      }}
                    >
                      <Link href={`dog/${dog.id}`} passHref legacyBehavior>
                        <a>
                          <Box
                            sx={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              borderRadius: "50%",
                              padding: "8px",
                              zIndex: 1,
                            }}
                          >
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                toggleFavorite(dog.id);
                              }}
                            >
                              {favoriteDogIds.includes(dog.id) ? (
                                <FavoriteIcon sx={{ color: "red" }} />
                              ) : (
                                <FavoriteBorderIcon sx={{ color: "white" }} />
                              )}
                            </IconButton>
                          </Box>
                          <CardMedia
                            component="img"
                            height="200"
                            image={dog.img}
                            alt={dog.name}
                            sx={{
                              objectFit: "cover",
                              borderBottom: "2px solid #FF4081",
                            }}
                          />
                          <CardContent>
                            <Box
                              sx={{
                                backgroundColor: "#444444",
                                borderRadius: "8px",
                                padding: "1rem",
                                mb: 2,
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: "bold",
                                  color: "#FF4081",
                                }}
                              >
                                {dog.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#cccccc" }}
                              >
                                {dog.breed}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#cccccc" }}
                              >
                                {dog.age} years old
                              </Typography>
                              {location.length > 0 ? (
                                location.map((loc, index) => (
                                  <Box key={index}>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontWeight: "bold",
                                        marginTop: "10px",
                                      }}
                                    >
                                      {loc.city}, {loc.state}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "#cccccc" }}
                                    >
                                      {loc.county} County | ZIP: {loc.zip_code}
                                    </Typography>
                                  </Box>
                                ))
                              ) : (
                                <Typography
                                  variant="body2"
                                  sx={{ fontStyle: "italic" }}
                                >
                                  Location information not available
                                </Typography>
                              )}
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: "bold",
                                  "&:hover": {
                                    color: "#FF4081",
                                  },
                                }}
                              >
                                Click to learn more!
                              </Typography>
                            </Box>
                          </CardContent>
                        </a>
                      </Link>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
              {matchedDog && (
                <Box
                  sx={{
                    marginTop: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      marginBottom: "1rem",
                    }}
                  >
                    Your Matched Dog
                  </Typography>
                  <Card
                    sx={{
                      backgroundColor: "#333",
                      color: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      width: { xs: "90%", md: "600px" },
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.4)",
                      },
                    }}
                  >
                    <Link href={`dog/${matchedDog.id}`} passHref legacyBehavior>
                      <a>
                        <CardMedia
                          component="img"
                          height="200"
                          image={matchedDog.img}
                          alt={matchedDog.name}
                          sx={{
                            objectFit: "cover",
                            borderBottom: "2px solid #FF4081",
                          }}
                        />
                        <CardContent>
                          <Box
                            sx={{
                              backgroundColor: "#444444",
                              borderRadius: "8px",
                              padding: "1rem",
                              mb: 2,
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: "bold",
                                color: "#FF4081",
                              }}
                            >
                              {matchedDog.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#cccccc" }}
                            >
                              {matchedDog.breed}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#cccccc" }}
                            >
                              {matchedDog.age} years old
                            </Typography>
                            {location.length > 0 ? (
                              location.map((loc, index) => (
                                <Box key={index}>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: "bold",
                                      marginTop: "10px",
                                    }}
                                  >
                                    {loc.city}, {loc.state}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "#cccccc" }}
                                  >
                                    {loc.county} County | ZIP: {loc.zip_code}
                                  </Typography>
                                </Box>
                              ))
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{ fontStyle: "italic" }}
                              >
                                Location information not available
                              </Typography>
                            )}
                          </Box>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: "bold",
                                "&:hover": {
                                  color: "#FF4081",
                                },
                              }}
                            >
                              Click to learn more!
                            </Typography>
                          </Box>
                        </CardContent>
                      </a>
                    </Link>
                  </Card>
                </Box>
              )}
            </>
          )}
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box
          sx={{
            transform: isMobile ? "translate(0% , 30%)" : "translate(0%, 40%)",
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
}
