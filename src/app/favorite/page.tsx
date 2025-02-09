"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Footer from "@/layouts/ui/footer";
import Navbar from "@/layouts/ui/navbar";
import {
  Box,
  Typography,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getDogs } from "@/utils/api";
import { Dog } from "@/models/types";
import { getMatchedDog } from "@/utils/api";

export default function Favorites() {
  const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  useEffect(() => {
    const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    console.log("Favorites from cookies:", favorites);
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

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#111",
        }}
      >
        <Box
          sx={{
            padding: "2rem",
            flex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
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
              <Grid2 container spacing={3}>
                {favoriteDogs.map((dog) => (
                  <Grid2 key={dog.id} size={{ xs: 12, md: 6, sm: 12 }}>
                    <Link href={`/dog/${dog.id}`} passHref>
                      <Card
                        sx={{
                          backgroundColor: "#222",
                          color: "#fff",
                          borderRadius: "12px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                          position: "relative",
                          cursor: "pointer",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                          },
                        }}
                      >
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
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                          }}
                        />
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                          >
                            {dog.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ marginBottom: "0.5rem" }}
                          >
                            Breed: {dog.breed}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
                          >
                            Age: {dog.age} years old
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            Location: {dog.zip_code}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid2>
                ))}
              </Grid2>
              {matchedDog && (
                <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#fff" }}
                  >
                    Your Matched Dog
                  </Typography>
                  <Link href={`/dog/${matchedDog.id}`} passHref>
                    <Card
                      sx={{
                        maxWidth: "400px",
                        margin: "0 auto",
                        marginTop: "1rem",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={matchedDog.img}
                        alt={matchedDog.name}
                        sx={{
                          objectFit: "cover",
                        }}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {matchedDog.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ marginBottom: "0.5rem" }}
                        >
                          Breed: {matchedDog.breed}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ marginBottom: "0.5rem" }}
                        >
                          Age: {matchedDog.age} years old
                        </Typography>
                        <Typography variant="body2">
                          Location: {matchedDog.zip_code}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Box>
              )}
            </>
          )}
        </Box>
        <Footer />
      </Box>
    </>
  );
}
