import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const RouletteContainer = styled(Box)({
  textAlign: "center",
  marginTop: "50px",
});

const Roulette = () => {
  const [result, setResult] = useState(null);

  const spinRoulette = () => {
    const options = [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
    ];
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];

    setResult(selectedOption);
  };
  return (
    <RouletteContainer>
      <Typography variant="h4" gutterBottom>
        Roulette
      </Typography>
      <Button variant="contained" onClick={spinRoulette}>
        Spin
      </Button>
      {result && (
        <Typography variant="h6" gutterBottom>
          {`Selected Option: ${result}`}
        </Typography>
      )}
    </RouletteContainer>
  );
};

export default Roulette;
