import { Box, Grid2, Input } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

export default function Search() {
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
          height: "grow",
        }}
      >
        <Grid2></Grid2>
      </Box>
    </>
  );
}
