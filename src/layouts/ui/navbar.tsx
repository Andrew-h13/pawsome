import { Box, Grid2 } from "@mui/material";

export default function Navbar() {
  return (
    <>
      <Grid2
        sx={{
          width: "100vw",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#2d2d2d",
          padding: "0 2rem",
          boxSizing: "border-box",
        }}
      >
        <Grid2
          container
          spacing={2}
          sx={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Grid2 size="auto">
            <Box>
              <Box style={{ color: "white" }}>PawsomeMatch</Box>
            </Box>
          </Grid2>
          <Grid2
            container
            columnSpacing={7}
            sx={{ alignItems: "center" }}
            size="auto"
          >
            <ul
              style={{
                color: "white",
                cursor: "pointer",
              }}
            >
              Contact
            </ul>
            <ul style={{ color: "white", cursor: "pointer" }}>about</ul>
            <ul style={{ color: "white", cursor: "pointer" }}>Sign in</ul>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
