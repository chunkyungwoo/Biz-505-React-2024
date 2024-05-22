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
    // const newPrizeNumber = Math.floor(
    //   Math.random() * categories.length
    // );
    // setPrizeNumber(newPrizeNumber);

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

  //   setTimeout(() => {
  //     setIsRotating(false);
  //     const adjustedPrizeNumber = adjustPrizeNumber(
  //       newPrizeNumber,
  //       categories.length
  //     );
  //     setResult(categories[adjustedPrizeNumber]);
  //   }, rotateTime);
  // };

  useEffect(() => {
    if (result) {
      console.log(`Fetching data for category: ${result}`);
      fetch(`/react/getCategory/${result}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log("Response status:", res.status);
          console.log("Response headers:", res.headers);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((newData) => {
          console.log("Received data:", newData);
          setResultData(newData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [result]);

  useEffect(() => {
    if (!isRotating && result !== null && hasSpun) {
      alert(`Selected Option: ${result}`);
      setHasSpun(false); // 알림 후 상태 초기화
    }
  }, [result, isRotating, hasSpun]);

  // useEffect(() => {
  //   if (!isRotating && hasSpun) {
  //     const adjustedPrizeNumber =
  //       (prizeNumber + Math.floor(categories.length / 2)) %
  //       categories.length;
  //     setResult(categories[adjustedPrizeNumber]);
  //   }
  // }, [prizeNumber, isRotating, hasSpun]);

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
        // key={startingOptionIndex}
      />
      {result && (
        <>
          <Typography variant="h6" gutterBottom>
            {`Selected Option: ${result}`}
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              결과 :
            </Typography>
            <List>
              {resultData.length > 0 ? (
                resultData.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
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
