import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TransactionButton from "../transaction/TransactionButton";
import { useSelector } from "react-redux";
import axios from "axios";


function TradeBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const symbol = searchParams.get("symbol");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedUnits, setSelectedUnits] = useState(0);
  const [selectedMode, setSelectedMode] = useState("buy");
  const [scaleFactor, setScaleFactor] = useState(1);
  const currency = useSelector((state) => state.stockPrice.currency);
  const price = useSelector((state) => state.stockPrice.price);
  if (currency) {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=ETH&api_key=db0586d77050155a01def6221e02c966e9d11981d2addd971d8ae21a85729e9a`
      )
      .then((res) => {
        console.log("scale Factor", res.data);
        setScaleFactor(res.data["ETH"]);
      });
  }
  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
  };
  const handleUnitsChange = (units) => {
    setSelectedUnits(units);
  };

  return (
    <Card
      sx={{
        // maxWidth: `1000px`,
        minWidth: "20rem",
        backgroundColor: "#F3EF52",
        height: "80%",
        minHeight: `600px`,
        padding: `20px 0px`,
        flexGrow: `2`,
      }}
    >
      <CardContent>
        <Typography variant="h4" align="center">
          Make a trade
        </Typography>
        <Box
          sx={{
            display: `flex`,
            flexDirection: `row`,
            gap: `10px`,
            margin: `10px 0px`,
          }}
        >
          <Box
            sx={{
              display: `flex`,
              flexDirection: `row`,
              gap: `10px`,
              justifyContent: `center`,
              width: `100%`,
              marginTop: "1.5rem",
            }}
          >
            <ButtonGroup
              variant="outlined"
              aria-label="outlined primary button group"
              sx={{
                backgroundColor: `black`,
                color: `white`,
                borderColor: `#F3EF52`,
              }}
            >
              <Button
                variant={selectedMode === "buy" ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedMode("buy");
                }}
                sx={{
                  backgroundColor: selectedMode === "buy" ? `black` : `#F3EF52`,
                  color: selectedMode === "buy" ? `white` : `black`,
                  borderColor: `black`,
                  "&:hover": {
                    backgroundColor: "black",
                    borderColor: "black",
                    color: `white`,
                  },
                }}
              >
                Buy
              </Button>
              <Button
                variant={selectedMode === "sell" ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedMode("sell");
                }}
                sx={{
                  backgroundColor:
                    selectedMode === "sell" ? `black` : `#F3EF52`,
                  color: selectedMode === "sell" ? `white` : `black`,
                  borderColor: `black`,
                  "&:hover": {
                    backgroundColor: "black",
                    borderColor: "black",
                    color: `white`,
                  },
                }}
              >
                Sell
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        <TextField
          id="trade-price-input"
          label="Enter Stock units"
          type="number"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          value={selectedUnits}
          sx={{
            width: `100%`,
            margin: `2rem 0px`,
          }}
          onChange={(e) => {
            handleUnitsChange(e.target.value);
            if (scaleFactor) {
              setSelectedAmount(scaleFactor * price * Number(e.target.value));
            }
          }}
          disabled={false}
        />
        {/* <Typography variant="body1">How much?</Typography> */}
        <Typography variant="h6">OR</Typography>
        {/* <Typography variant="body1">Stock units?</Typography> */}
        <TextField
          id="trade-price-input"
          label="Enter Amount in ETH"
          type="number"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          value={selectedAmount}
          sx={{
            width: `100%`,
            margin: `2rem 0px`,
          }}
          onChange={(e) => {
            handleAmountChange(e.target.value);
            if (scaleFactor) {
              setSelectedUnits(Number(e.target.value) / (price * scaleFactor));
            }
          }}
          disabled={false}
        />
        <Box
          sx={{
            display: `flex`,
            flexDirection: `row`,
            gap: `10px`,
            flexWrap: `wrap`,
            justifyContent: `center`,
            width: `100%`,
            margin: `2rem 0px`,
          }}
        >
          <Chip
            label="100"
            variant="outlined"
            onClick={() => {
              handleAmountChange(100);
              if (scaleFactor) {
                setSelectedUnits(100 / (price * scaleFactor));
              }
            }}
            sx={{
              borderColor: `black`,
            }}
          />
          <Chip
            label="200"
            variant="outlined"
            onClick={() => {
              handleAmountChange(200);
              if (scaleFactor) {
                setSelectedUnits(Number(200) / (price * scaleFactor));
              }
            }}
            sx={{
              borderColor: `black`,
            }}
          />
          <Chip
            label="500"
            variant="outlined"
            onClick={() => {
              handleAmountChange(500);
              if (scaleFactor) {
                setSelectedUnits(Number(500) / (price * scaleFactor));
              }
            }}
            sx={{
              borderColor: `black`,
            }}
          />
          <Chip
            label="1000"
            variant="outlined"
            onClick={() => {
              handleAmountChange(1000);
              if (scaleFactor) {
                setSelectedUnits(Number(1000) / (price * scaleFactor));
              }
            }}
            sx={{
              borderColor: `black`,
            }}
          />
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: `center`,
          margin: `20px 0px`,
        }}
      >
        <TransactionButton selectedAmount={selectedAmount} symbol={symbol} selectedUnits={selectedUnits}/>
      </CardActions>
    </Card>
  );
}

export default TradeBar;
