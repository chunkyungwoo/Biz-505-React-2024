import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";
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
const adjustPrizeNumber = (prizeNumber, totalCategories) => {
  return (
    (prizeNumber + Math.floor(totalCategories / 2)) % totalCategories
  );
};

const Roulette = () => {
  const [result, setResult] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [startingOptionIndex, setStartingOptionIndex] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [resultData, setResultData] = useState([]);

  const rotateTime = 8000;

  const startRotation = () => {
    setResult(null);
    setHasSpun(true);
    const newPrizeNumber = Math.floor(
      Math.random() * categories.length
    );
    setPrizeNumber(newPrizeNumber);
    setStartingOptionIndex(newPrizeNumber);

    setIsRotating(true);

    // 이전 타이머 취소
    if (timerId) {
      clearTimeout(timerId);
    }
    // 새로운 타이머 설정
    const newTimerId = setTimeout(() => {
      setIsRotating(false);
      const adjustedPrizeNumber = adjustPrizeNumber(
        newPrizeNumber,
        categories.length
      );
      setResult(categories[adjustedPrizeNumber]);
    }, rotateTime);

    setTimerId(newTimerId);
  };

  useEffect(() => {
    if (result) {
      console.log(result);
      fetch(`/food/react/getCategory/${result + ""}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Errorssss");
          }
          return res.json();
        })
        .then((newData) => {
          setResultData(newData);
        })
        .catch((error) => {
          console.error("Errorrrrrr:", error);
        });
    }
  }, [result]);

  useEffect(() => {
    if (!isRotating && result !== null && hasSpun) {
      alert(`Selected Option: ${result}`);
      setHasSpun(false); // 알림 후 상태 초기화
    }
  }, [result, isRotating, hasSpun]);

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
        spinDuration={rotateTime / 8000}
        startingOptionIndex={startingOptionIndex}
        mustStartSpinning={isRotating}
        prizeNumber={prizeNumber}
        data={categories.map((category) => ({ option: category }))}
        onStopSpinning={() => {
          setIsRotating(false);
        }}
      />
      {result && (
        <>
          <Typography variant="h6" gutterBottom>
            {`Selected Option: ${result}`}
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <List>
              {resultData.length > 0 ? (
                resultData.map((item, index) => (
                  <ListItem key={index}>{item.f_foodname}</ListItem>
                ))
              ) : (
                <ListItem>데이터 없음</ListItem>
              )}
            </List>
          </Box>
        </>
      )}
      <Button
        variant="contained"
        onClick={startRotation}
        disabled={isRotating}
        sx={{ marginTop: "20px" }}
      >
        Spin Again
      </Button>
    </RouletteContainer>
  );
};

export default Roulette;
