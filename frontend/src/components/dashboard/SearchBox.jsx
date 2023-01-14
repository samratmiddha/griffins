import {
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import debouncer from "../../utilities/debouncer";
import { nanoid } from "nanoid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Search from "@mui/icons-material/Search";

function SearchBox() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setLoading(true);
      axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${nanoid()}`
        )
        .then((response) => {
          setLoading(false);
          if (response.data.bestMatches) {
            setSearchResults(response.data.bestMatches);
          } else {
            setSearchResults([]);
          }
          console.log(response);
        });
    } else {
      setSearchResults([]);
    }
  };

  const debouncedSearch = useCallback(debouncer(handleSearch), []);
  return (
    <Box
      sx={{
        width: `70%`,
        alignSelf: "center",
      }}
    >
      <TextField
        id="trade-price-input"
        placeholder="Search Stocks"
        type="text"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          margin: `10px 0px`,
          width: `100%`,
          backgroundColor: "#141518",
          input: { color: "#F3EF52" },
          borderColor: `#F3EF52`,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#F3EF52",
            },
            "&:hover fieldset": {
              borderColor: "#F3EF52",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#F3EF52",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search
                sx={{
                  color: "#F3EF52",
                }}
              />
            </InputAdornment>
          ),
        }}
        onChange={debouncedSearch}
      />
      <List sx={{ width: "100%", backgroundColor: "#F3EF52" }}>
        {loading ? (
          <ListItem>
            <ListItemText primary={"Loading..."} />
          </ListItem>
        ) : searchResults.length === 0 ? (
          <ListItem>
            <ListItemText primary={"No results to show."} />
          </ListItem>
        ) : (
          searchResults.map((result) => {
            return (
              <ListItem key={result["1. symbol"]} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/stock?symbol=${result["1. symbol"]}`);
                  }}
                  dense
                >
                  <ListItemText
                    id={String(result["1. symbol"])}
                    primary={`${result["2. name"]} (${result["1. symbol"]})`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>
    </Box>
  );
}

export default SearchBox;
