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

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      const data = await searchDog(
        [],
        [],
        undefined,
        undefined,
        from,
        dogsPerPage,
        { field: "name", direction: "asc" }
      );

      setDogs(data.resultIds || []);
      setNext(data.next || null);
      setPrev(data.prev || null);
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
              {dogs.map((dog) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={dog.id}>
                  <Card sx={{ backgroundColor: "#333", color: "#fff" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={dog.img}
                      alt={dog.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="h6">{dog.name}</Typography>
                      <Typography variant="body2">
                        Breed: {dog.breed}
                      </Typography>
                      <Typography variant="body2">
                        Age: {dog.age} years
                      </Typography>
                      <Typography variant="body2">
                        Zip Code: {dog.zip_code}
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
