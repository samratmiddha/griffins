import { Box, Typography } from "@mui/material";

const style = {
  background: `black`,
  padding: `5px`,
  color: `#F3EF52`,
  textAlign: `center`,
  fontSize: `20px`,
  position: `sticky`,
  bottom: `0px`,
  height: `auto`,
};

export default function CreditsFooter() {
  return (
    <Box sx={style}>
      <Typography variant="subtitle1">
        {"による🤍で作られました "}
        <b>Team Griffins</b>
      </Typography>
    </Box>
  );
}
