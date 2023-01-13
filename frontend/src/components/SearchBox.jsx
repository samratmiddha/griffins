import {
  Autocomplete,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import debouncer from "../utilities/debouncer";
import { nanoid } from "nanoid";
import axios from "axios";

function SearchBox() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value !== "") {
      axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${nanoid()}`
        )
        .then((response) => {
          setSearchResults(response.data.bestMatches);
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
      }}
    >
      <TextField
        id="trade-price-input"
        label="Search Stocks"
        type="text"
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          margin: `10px 0px`,
          width: `100%`,
        }}
        onChange={debouncedSearch}
      />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {searchResults.map((result) => {
          return (
            <ListItem key={result["1. symbol"]} disablePadding>
              <ListItemButton onClick={() => console.log(result)} dense>
                <ListItemText
                  id={String(result["1. symbol"])}
                  primary={`${result["2. name"]} (${result["1. symbol"]})`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default SearchBox;
