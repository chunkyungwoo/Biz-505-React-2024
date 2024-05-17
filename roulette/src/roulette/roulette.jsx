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
  const [hasSpun, setHasSpun] = useState(false);

  const rotateTime = 3000;

  const startRotation = () => {
    setHasSpun(true);
    const newStartingOptionIndex = Math.floor(
      Math.random() * categories.length
    );
    setStartingOptionIndex(newStartingOptionIndex);

    setIsRotating(true);
    const newPrizeNumber = Math.floor(
      Math.random() * categories.length
    );
    setPrizeNumber(newPrizeNumber);
    setTimeout(() => {
      setIsRotating(false);
      setResult(categories[newPrizeNumber]);
    }, rotateTime);
  };

  useEffect(() => {
    if (!isRotating && result !== null && hasSpun) {
      alert(`Selected Option: ${result}`);
      setHasSpun(false); // 알림 후 상태 초기화
    }
  }, [result, isRotating, hasSpun]);

  // && prizeNumber !== null
  useEffect(() => {
    if (!isRotating && hasSpun) {
      setResult(categories[prizeNumber]);
    }
  }, [prizeNumber, isRotating, hasSpun]);

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
        spinDuration={rotateTime / 1000}
        startingOptionIndex={startingOptionIndex}
        mustStartSpinning={isRotating}
        prizeNumber={prizeNumber}
        data={categories.map((category) => ({ option: category }))}
        onStopSpinning={() => {
          setIsRotating(false);
        }}
        // key={startingOptionIndex}
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
