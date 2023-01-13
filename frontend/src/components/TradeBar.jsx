import { useState } from "react";
import { Box, Button, ButtonGroup, Chip, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function TradeBar() {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedUnits, setSelectedUnits] = useState(0);
  const [selectedMode, setSelectedMode] = useState("buy");
  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
  };
  const handleUnitsChange = (units) => {
    setSelectedUnits(units);
  };


  return (
    <Card
      sx={{
        maxWidth: `300px`,
      }}
    >
      <CardContent>
        <Typography variant="h6">Make a trade</Typography>
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
            }}
          >
            <ButtonGroup
              variant="outlined"
              aria-label="outlined primary button group"
            >
              <Button variant={selectedMode === "buy" ? "contained" : "outlined"} onClick={() => {setSelectedMode("buy")}}>Buy</Button>
              <Button variant={selectedMode === "sell" ? "contained" : "outlined"} onClick={() => {setSelectedMode("sell")}}>Sell</Button>
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
            margin: `10px 0px`,
          }}
          onChange={(e) => {
            handleUnitsChange(e.target.value);
          }}
          disabled={selectedAmount != 0}
        />
        {/* <Typography variant="body1">How much?</Typography> */}
        <Typography variant="h6">OR</Typography>
        {/* <Typography variant="body1">Stock units?</Typography> */}
        <TextField
          id="trade-price-input"
          label="Enter Amount in USD$"
          type="number"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          value={selectedAmount}
          sx={{
            width: `100%`,
            margin: `10px 0px`,
          }}
          onChange={(e) => {
            handleAmountChange(e.target.value);
          }}
          disabled={selectedUnits != 0}
        />
        <Box
          sx={{
            display: `flex`,
            flexDirection: `row`,
            gap: `10px`,
            flexWrap: `wrap`,
            justifyContent: `center`,
            width: `100%`,
            margin: `10px 0px`
          }}
        >
          <Chip
            label="100"
            variant="outlined"
            onClick={() => {
              handleAmountChange(100);
            }}
            disabled={selectedUnits != 0}
          />
          <Chip
            label="200"
            variant="outlined"
            onClick={() => {
              handleAmountChange(200);
            }}
            disabled={selectedUnits != 0}
          />
          <Chip
            label="500"
            variant="outlined"
            onClick={() => {
              handleAmountChange(500);
            }}
            disabled={selectedUnits != 0}
          />
          <Chip
            label="1000"
            variant="outlined"
            onClick={() => {
              handleAmountChange(1000);
            }}
            disabled={selectedUnits != 0}
          />
        </Box>
      </CardContent>
      <CardActions
        sx={{
          width: `100%`,
          justifyContent: `center`,
          margin: `20px 0px`,
        }}
      >
        <Button variant="contained" sx={{
          borderRadius: `20px`,
          width: `200px`
        }}>Continue</Button>
      </CardActions>
    </Card>
  );
}

export default TradeBar;
