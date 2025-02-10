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
  useMediaQuery,
  useTheme,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Dog, Location } from "@/models/types";
import {
  fetchLocations,
  getBreeds,
  getDogs,
  searchDog,
  searchLocations,
} from "@/utils/api";
import PetsIcon from "@mui/icons-material/Pets";
import Link from "next/link";
import Cookies from "js-cookie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface Field {
  placeholder: string;
  onChange: (value: string) => void;
  width: string;
}

export default function DogList() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [location, setLocation] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [sortField, setSortField] = useState<"breed" | "name" | "age">("breed");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [breedSearch, setBreedSearch] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [breeds, setBreeds] = useState<string[]>([]);

  const [city, setCity] = useState("");
  const [states, setStates] = useState<string[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const breedList = await getBreeds();

      setBreeds(breedList);
      console.log("All Breeds:", breedList);
    };

    fetchBreeds();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize, sortField, sortDirection]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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

      const from = (page - 1) * pageSize;

      let searchData;

      if (city || states.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const locationParams: any = {};
        if (city) locationParams.city = city;
        if (states.length > 0) locationParams.states = states;

        searchData = await searchLocations({
          ...locationParams,
          from: (page - 1) * pageSize,
          size: pageSize,
          sort: { field: sortField, direction: sortDirection },
        });
      } else {
        searchData = await searchDog(
          breedArray,
          zipArray,
          ageMin,
          ageMax,
          from,
          pageSize,
          { field: sortField, direction: sortDirection }
        );
      }

      console.log("Search API Response:", searchData);

      if (searchData.resultIds && searchData.resultIds.length > 0) {
        const dogsData = await getDogs(searchData.resultIds);
        console.log("Dogs Data:", dogsData);
        setDogs(dogsData);
        setTotalPages(Math.ceil((searchData.total || 0) / pageSize));
      } else {
        setDogs([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("An error occurred while searching for dogs:", error);
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

        const from = (page - 1) * pageSize;

        let searchData;

        if (city || states.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const locationParams: any = {};
          if (city) locationParams.city = city;
          if (states.length > 0) locationParams.states = states;

          searchData = await searchLocations({
            ...locationParams,
            from: (page - 1) * pageSize,
            size: pageSize,
            sort: { field: sortField, direction: sortDirection },
          });
        } else {
          searchData = await searchDog(
            breedArray,
            zipArray,
            ageMinValue,
            ageMaxValue,
            from,
            pageSize,
            { field: sortField, direction: sortDirection }
          );
        }

        console.log("Search API Response:", searchData);

        if (searchData.resultIds && searchData.resultIds.length > 0) {
          const dogsData = await getDogs(searchData.resultIds);
          console.log("Dogs Data:", dogsData);
          setDogs(dogsData);
          setTotalPages(Math.ceil((searchData.total || 0) / pageSize));
        } else {
          setDogs([]);
        }
      } catch (error) {
        console.error("An error occurred while fetching dogs:", error);
        setDogs([]);
      }
      setLoading(false);
    };

    fetchDogs();
  }, [
    breedSearch,
    page,
    maxAge,
    minAge,
    zipCode,
    city,
    states,
    pageSize,
    sortField,
    sortDirection,
  ]);

  const fields: Field[] = [
    // Cant get city or State to be sorted shows on mobile
    {
      placeholder: "City",
      onChange: (value: string) => setCity(value),
      width: "0px",
    },
    {
      placeholder: "State",
      onChange: (value: string) =>
        setStates(value.split(",").map((s) => s.trim())),
      width: "0px",
    },
    {
      placeholder: "Zipcode",
      onChange: (value: string) => setZipCode(value),
      width: "150px",
    },
  ];

  useEffect(() => {
    const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    setFavoriteDogs(favorites);
  }, []);

  const toggleFavorite = (dogId: string) => {
    let updatedFavorites = [...favoriteDogs];

    if (updatedFavorites.includes(dogId)) {
      updatedFavorites = updatedFavorites.filter((id) => id !== dogId);
    } else {
      updatedFavorites.push(dogId);
    }

    setFavoriteDogs(updatedFavorites);
    Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 30 });
  };

  useEffect(() => {
    if (dogs.length === 0 || !dogs[0].zip_code) return;

    const fetchLocationData = async () => {
      try {
        const zipCodes = [dogs[0].zip_code];
        const locationData = await fetchLocations(zipCodes);
        setLocation(locationData);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };

    fetchLocationData();
  }, [dogs]);

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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          padding: "1rem",
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
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Stack
            spacing={3}
            direction={isMobile ? "column" : "row"}
            sx={{
              width: "100%",
              maxWidth: isMobile ? "90%" : "100vw",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {fields.map((field, index) => (
              <Box
                key={index}
                component="form"
                onSubmit={handleSearch}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#2d2d2d",
                  borderRadius: "25px",
                  padding: "0.5rem 1rem",
                  width: isMobile ? "100%" : field.width,
                  height: "3rem",
                  marginTop: "10px",
                }}
              >
                <Input
                  placeholder={field.placeholder}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(e.target.value)
                  }
                  sx={{
                    marginLeft: "1rem",
                    flex: 1,
                    color: "#ccc",
                    "& .MuiInputBase-root": {
                      "&:focus": { outline: "none", boxShadow: "none" },
                    },
                  }}
                />
              </Box>
            ))}

            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Box>
                <InputLabel sx={{ color: "white" }}></InputLabel>
                <input
                  type="number"
                  placeholder="Min Age"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  style={{ padding: "8px", width: "100px" }}
                />
              </Box>
              <Box>
                <InputLabel sx={{ color: "white" }}></InputLabel>
                <input
                  type="number"
                  placeholder="Max Age"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  style={{ padding: "8px", width: "100px" }}
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel
                  sx={{
                    color: "white",
                    backgroundColor: "#2d2d2d",
                    padding: "0 4px",
                  }}
                >
                  Sort By
                </InputLabel>
                <Select
                  value={sortField}
                  onChange={(e) =>
                    setSortField(e.target.value as "breed" | "name" | "age")
                  }
                  sx={{
                    backgroundColor: "#2d2d2d",
                    color: "white",
                    borderRadius: "25px",
                    "& .MuiSelect-icon": { color: "white" },
                  }}
                >
                  <MenuItem value="breed">Breed</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="age">Age</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: "white" }}>Direction</InputLabel>
                <Select
                  value={sortDirection}
                  onChange={(e) =>
                    setSortDirection(e.target.value as "asc" | "desc")
                  }
                  sx={{
                    backgroundColor: "#2d2d2d",
                    color: "white",
                    borderRadius: "25px",
                    "& .MuiSelect-icon": { color: "white" },
                  }}
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 140 }}>
                <InputLabel sx={{ color: "white" }}>
                  Results per page
                </InputLabel>
                <Select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  sx={{
                    backgroundColor: "#2d2d2d",
                    color: "white",
                    borderRadius: "25px",
                    "& .MuiSelect-icon": { color: "white" },
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
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
                      position: "relative",
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

                          <Typography variant="body2" sx={{ color: "#cccccc" }}>
                            {dog.breed}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#cccccc" }}>
                            {dog.age} years old
                          </Typography>
                          {location.length > 0 ? (
                            location.map((location, index) => (
                              <Box key={index}>
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: "bold", marginTop: "10px" }}
                                >
                                  {location.city}, {location.state}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#cccccc" }}
                                >
                                  {location.county} County | ZIP:{" "}
                                  {location.zip_code}
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
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              transform: "translate(20%, 10%)",
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
                    </Link>
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
                          toggleFavorite(dog.id);
                        }}
                        sx={{
                          "&:hover": {
                            color: "#FF4081",
                          },
                        }}
                      >
                        {favoriteDogs.includes(dog.id) ? (
                          <FavoriteIcon
                            sx={{
                              color: "red",
                            }}
                          />
                        ) : (
                          <FavoriteBorderIcon sx={{ color: "white" }} />
                        )}
                      </IconButton>
                    </Box>
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
