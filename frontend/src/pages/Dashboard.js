import { Box, Typography } from "@mui/material";
import SearchBox from "../components/dashboard/SearchBox";
import TradeBar from "../components/stock/TradeBar";

export default function Dashboard() {
  return (
    <Box
      sx={{
        backgroundColor: "#141518",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{ color: "#F3EF52", marginBottom: "2rem" }}
        align="center"
      >
        Webster
      </Typography>
      <SearchBox />
    </Box>
  );
}
