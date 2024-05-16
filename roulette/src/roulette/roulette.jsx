import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Wheel } from "react-custom-roulette";

const RouletteContainer = styled(Box)({
  textAlign: "center",
  marginTop: "50px",
  position: "relative",
});

const categories = [
  "중식",
  "일식",
  "한식",
  "분식",
  "양식",
  "패스트푸드",
];

const Roulette = () => {
  const [result, setResult] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [startingOptionIndex, setStartingOptionIndex] = useState(0);

  const rotateTime = 8000; // 8초

  const startRotation = () => {
    const newStartingOptionIndex = Math.floor(
      Math.random() * categories.length
    );
    setStartingOptionIndex(newStartingOptionIndex);

    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      const newPrizeNumber = Math.floor(
        Math.random() * categories.length
      );
      setPrizeNumber(newPrizeNumber);
      setResult(categories[newPrizeNumber]);
    }, rotateTime);
  };

  useEffect(() => {
    if (!isRotating) {
      setResult(categories[prizeNumber]);
    }
  }, [prizeNumber, isRotating]);

  return (
    <RouletteContainer>
      <Typography variant="h4" gutterBottom>
        Roulette
      </Typography>
      <Button
        variant="contained"
        onClick={startRotation}
        disabled={isRotating}
      >
        Spin
      </Button>
      <Wheel // Wheel 컴포넌트 사용
        spinDuration={0.2}
        startingOptionIndex={startingOptionIndex}
        mustStartSpinning={isRotating}
        prizeNumber={prizeNumber}
        data={categories.map((category) => ({ option: category }))}
        onStopSpinning={() => {}}
        key={startingOptionIndex}
      />
      {result && (
        <Typography variant="h6" gutterBottom>
          {`Selected Option: ${result}`}
        </Typography>
      )}
    </RouletteContainer>
  );
};

export default Roulette;
