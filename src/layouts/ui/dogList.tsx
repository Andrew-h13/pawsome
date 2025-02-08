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
  Input,
  Autocomplete,
  TextField,
  Pagination,
} from "@mui/material";
import { Dog } from "@/models/types";
import { getBreeds, getDogs, searchDog, searchLocations } from "@/utils/api";
import PetsIcon from "@mui/icons-material/Pets";
import Link from "next/link";

export default function DogList() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  //   const [from, setFrom] = useState<string | undefined>(undefined);
  //   const [next, setNext] = useState<string | undefined>(undefined);
  //   const [prev, setPrev] = useState<string | undefined>(undefined);
  const dogsPerPage = 24;

  const [breedSearch, setBreedSearch] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [breeds, setBreeds] = useState<string[]>([]);

  const [city, setCity] = useState("");
  const [states, setStates] = useState<string[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchBreeds = async () => {
      const breedList = await getBreeds();
      setBreeds(breedList);
    };

    fetchBreeds();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const breedArray = breedSearch.trim()
        ? breedSearch.split(",").map((b) => b.trim())
        : [];

      const zipArray = zipCode.trim()
        ? zipCode.split(",").map((z) => z.trim())
        : [];

      const ageMin = minAge !== "" ? Number(minAge) : undefined;
      const ageMax = maxAge !== "" ? Number(maxAge) : undefined;

      const searchData = await searchDog(
        breedArray,
        zipArray,
        ageMin,
        ageMax,
        page,
        dogsPerPage,
        { field: "name", direction: "asc" }
      );

      console.log("Search API Response:", searchData);

      if (searchData.resultIds && searchData.resultIds.length > 0) {
        const dogsData = await getDogs(searchData.resultIds);
        console.log("Dogs Data:", dogsData);
        setDogs(dogsData);
        setTotalPages(
          searchData.totalPages || Math.ceil(searchData.total / dogsPerPage)
        );
      } else {
        setDogs([]);
        setTotalPages(1);
      }

      //   setNext(searchData.next || undefined);
      //   setPrev(searchData.prev || undefined);
    } catch (error) {
      console.error("An error occurred while searching for dogs:", error);
      setDogs([]);
    }
    setLoading(false);
  };

  const handleLocationSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const searchParams: any = {};

      if (city) searchParams.city = city;
      if (states.length > 0) searchParams.states = states;

      const locationResults = await searchLocations(searchParams);

      console.log("Location Search API Response:", locationResults);

      if (locationResults.resultIds && locationResults.resultIds.length > 0) {
        const dogsData = await getDogs(locationResults.resultIds);
        console.log("Dogs Data:", dogsData);

        setDogs(dogsData);
      } else {
        setDogs([]);
      }

      //   setNext(locationResults.next || undefined);
      //   setPrev(locationResults.prev || undefined);
    } catch (error) {
      console.error("An error occurred while searching for locations:", error);
      setDogs([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      try {
        const breedArray = breedSearch.trim()
          ? breedSearch.split(",").map((b) => b.trim())
          : [];

        const zipArray = zipCode.trim()
          ? zipCode.split(",").map((z) => z.trim())
          : [];
        const ageMinValue = minAge !== "" ? Number(minAge) : undefined;
        const ageMaxValue = maxAge !== "" ? Number(maxAge) : undefined;
        const searchData = await searchDog(
          breedArray,
          zipArray,
          ageMinValue,
          ageMaxValue,
          page,
          dogsPerPage,
          { field: "name", direction: "asc" }
        );

        console.log("Search API Response:", searchData);

        if (searchData.resultIds && searchData.resultIds.length > 0) {
          const dogsData = await getDogs(searchData.resultIds);
          console.log("Dogs Data:", dogsData);
          setDogs(dogsData);
          setTotalPages(
            searchData.totalPages || Math.ceil(searchData.total / dogsPerPage)
          );
        } else {
          setDogs([]);
        }

        // setNext(searchData.next || undefined);
        // setPrev(searchData.prev || undefined);
      } catch (error) {
        console.error("An error occurred while fetching dogs:", error);
        setDogs([]);
      }
      setLoading(false);
    };

    fetchDogs();
  }, [breedSearch, page, maxAge, minAge, zipCode]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          width: "100vw",
          height: "100px",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#111111",
        }}
      >
        <Grid2 container rowSpacing={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#2d2d2d",
              borderRadius: "25px",
              padding: "0.5rem 1rem",
              width: "500px",
              height: "3rem",
              marginTop: "25px",
            }}
          >
            <PetsIcon
              sx={{ fontSize: "24px", color: "rgba(255, 255, 255, 0.2)" }}
            />

            <Autocomplete
              freeSolo
              options={breeds}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : ""
              }
              inputValue={breedSearch}
              onInputChange={(_, newValue) => setBreedSearch(newValue)}
              loading={loading}
              sx={{ flex: 1, marginLeft: "0.75rem" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a dog breed"
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                    },
                  }}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      sx: {
                        color: "#fff",
                        fontSize: "1rem",
                      },
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps?.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
            />
          </Box>
        </Grid2>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "auto",
        }}
      >
        <Grid2
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#2d2d2d",
              borderRadius: "25px",
              padding: "0.5rem 1rem",
              width: "125px",
              height: "3rem",
              marginTop: "25px",
            }}
          >
            <PetsIcon
              sx={{ fontSize: "24px", color: "rgba(255, 255, 255, 0.2)" }}
            />
            <Input
              placeholder="Zipcode"
              onChange={(e) => setZipCode(e.target.value)}
              sx={{
                marginLeft: "0.75rem",
                flex: 1,
                color: "#ccc",
                "& .MuiInputBase-root": {
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                },
              }}
            />
          </Box>
          <Box
            component="form"
            onSubmit={handleLocationSearch}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#2d2d2d",
              borderRadius: "25px",
              padding: "0.5rem 1rem",
              width: "125px",
              height: "3rem",
              marginTop: "25px",
            }}
          >
            <PetsIcon
              sx={{ fontSize: "24px", color: "rgba(255, 255, 255, 0.2)" }}
            />
            <Input
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              sx={{
                marginLeft: "0.75rem",
                flex: 1,
                color: "#ccc",
                "& .MuiInputBase-root": {
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                },
              }}
            />
          </Box>
          <Box
            component="form"
            onSubmit={handleLocationSearch}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#2d2d2d",
              borderRadius: "25px",
              padding: "0.5rem 1rem",
              width: "200px",
              height: "3rem",
              marginTop: "25px",
            }}
          >
            <PetsIcon
              sx={{ fontSize: "24px", color: "rgba(255, 255, 255, 0.2)" }}
            />
            <Input
              placeholder="State"
              onChange={(e) =>
                setStates(e.target.value.split(",").map((s) => s.trim()))
              }
              sx={{
                marginLeft: "0.75rem",
                flex: 1,
                color: "#ccc",
                "& .MuiInputBase-root": {
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                },
              }}
            />
          </Box>
          <Box
            sx={{
              position: "flex",
              justifyContent: "end",
            }}
          >
            <input
              type="number"
              placeholder="Min Age"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              style={{ marginRight: "10px", padding: "8px", width: "80px" }}
            />
            <input
              type="number"
              placeholder="Max Age"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              style={{ marginRight: "10px", padding: "8px", width: "80px" }}
            />
          </Box>
        </Grid2>
      </Box>
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
                    <Link href={`dog/${dog.id}`} passHref>
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
                      </CardContent>
                    </Link>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
