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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const categories = [
  "중식",
  "일식",
  "한식",
  "분식",
  "양식",
  "패스트푸드",
];
// const adjustPrizeNumber = (prizeNumber, totalCategories) => {
//   return (
//     (prizeNumber + Math.floor(totalCategories / 2)) % totalCategories
//   );
// };

const Roulette = () => {
  const [result, setResult] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const rotateTime = 9000;

  useEffect(() => {
    if (result) {
      console.log(result);
      fetch(`/food/react/getCategory/${result}`, {
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

  const startRotation = () => {
    setHasSpun(true);
    const newPrizeNumber = Math.floor(
      Math.random() * categories.length
    );
    setPrizeNumber(newPrizeNumber);
    setIsRotating(true);

    setResult(categories[newPrizeNumber]);
    setTimeout(() => {
      setIsRotating(false);
    }, rotateTime);
  };

  const handleSpinAgain = () => {
    if (resultData.length > 0) {
      let index = 0;
      const intervalId = setInterval(() => {
        setCurrentIndex(index);
        index = (index + 1) % resultData.length;
      }, 50); // setInterval 간격을 더 작게 조정
      setTimeout(() => {
        clearInterval(intervalId);
        const randomIndex = Math.floor(
          Math.random() * resultData.length
        );
        setRandomItem(resultData[randomIndex]);
      }, 3000);
    }
  };

  useEffect(() => {
    if (randomItem) {
      console.log("Random Item:", randomItem.f_foodname);
    }
  }, [randomItem]);

  return (
    <RouletteContainer>
      <Typography variant="h4" gutterBottom>
        돌림판
      </Typography>
      <Button
        variant="contained"
        onClick={startRotation}
        disabled={isRotating}
      >
        돌려
      </Button>
      <Wheel
        spinDuration={rotateTime}
        startingOptionIndex={0}
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
            {`결과: ${result}`}
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
              height: "50px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <List>
              {resultData.length > 0 ? (
                <ListItem>
                  {resultData[currentIndex].f_foodname}
                </ListItem>
              ) : (
                <ListItem>데이터 없음</ListItem>
              )}
            </List>
          </Box>
          {randomItem && (
            <Typography variant="h6" gutterBottom>
              {`결과: ${randomItem.f_foodname}`}
            </Typography>
          )}
        </>
      )}
      <Button
        variant="contained"
        onClick={handleSpinAgain}
        disabled={isRotating}
        sx={{ marginTop: "20px" }}
      >
        돌려
      </Button>
    </RouletteContainer>
  );
};

export default Roulette;
