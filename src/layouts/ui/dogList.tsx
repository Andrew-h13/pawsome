"use client";
import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Dog } from "@/models/types";
import { getDogs, searchDog } from "@/utils/api";
import PetsIcon from "@mui/icons-material/Pets";

export default function DogList() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [next, setNext] = useState<string | undefined>(undefined);
  const [prev, setPrev] = useState<string | undefined>(undefined);
  const dogsPerPage = 24;

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);

      try {
        const data = await getDogs([]);
        console.log("Dogs data:", data);

        if (data) {
          setDogs(data);
        }
      } catch (error) {
        console.error("An error occurred while fetching dogs:", error);
      }

      setLoading(false);
    };

    fetchDogs();
  }, []);

  //   useEffect(() => {
  //     const fetchDogs = async () => {
  //       setLoading(true);
  //       const data = await searchDog(
  //         [],
  //         [],
  //         undefined,
  //         undefined,
  //         from,
  //         dogsPerPage,
  //         { field: "name", direction: "asc" }
  //       );

  //       setDogs(data.resultIds || []);
  //       setNext(data.next || null);
  //       setPrev(data.prev || null);
  //       setLoading(false);
  //     };
  //     fetchDogs();
  //   }, [from]);

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      try {
        const searchData = await searchDog(
          [],
          [],
          undefined,
          undefined,
          from,
          dogsPerPage,
          { field: "name", direction: "asc" }
        );

        console.log("Search API Response:", searchData);

        if (searchData.resultIds && searchData.resultIds.length > 0) {
          const dogsData = await getDogs(searchData.resultIds);
          console.log("Dogs Data:", dogsData);
          setDogs(dogsData);
        } else {
          setDogs([]);
        }

        setNext(searchData.next || null);
        setPrev(searchData.prev || null);
      } catch (error) {
        console.error("An error occurred while fetching dogs:", error);
        setDogs([]);
      }
      setLoading(false);
    };

    fetchDogs();
  }, [from]);

  return (
    <>
      <Box
        sx={{ padding: "20px", backgroundColor: "#222", borderRadius: "10px" }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid2 container spacing={2}>
              {dogs.map((dog, index) => (
                <Grid2
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={dog.id || index}
                >
                  <Card
                    sx={{
                      backgroundColor: "#333",
                      color: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.4)",
                      },
                    }}
                  >
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
                          backgroundColor: "#FF4081",
                          color: "#fff",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "auto",
                          marginBottom: "1rem",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#e0336b",
                          },
                        }}
                      >
                        <PetsIcon fontSize="small" />
                      </Box>
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
                        {dog.breed}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
                      >
                        {dog.age} years old
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        Location: {dog.zip_code}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={!prev}
                onClick={() => setFrom(prev || undefined)}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                color="primary"
                disabled={!next}
                onClick={() => setFrom(next || undefined)}
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
