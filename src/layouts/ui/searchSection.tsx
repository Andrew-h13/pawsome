"use client";
import { Box, Grid2, Input } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
// import { useState } from "react";

export default function Search() {
  // const [ageRange, setAgeRange] = useState([0, 15]);

  // const handleSliderChange = (event, newValue) => {
  //   setAgeRange(newValue);
  // };

  return (
    <>
      <Box
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
            <Input
              placeholder="Search for your furry companion!"
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

          {/* <Box
            sx={{
              width: "150px",
              marginTop: "25px",
            }}
          >
            <Slider
              getAriaLabel={() => "Age range"}
              value={ageRange}
              min={0}
              max={15}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}`}
              step={1}
              onChange={handleSliderChange}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>{ageRange[0]} </span>
              <span>{ageRange[1]} </span>
            </Box> */}
          {/* </Box> */}
        </Grid2>
      </Box>
    </>
  );
}
