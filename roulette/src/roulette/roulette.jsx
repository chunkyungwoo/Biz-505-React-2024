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
  // const [hasSpun, setHasSpun] = useState(false);
  const [resultData, setResultData] = useState([]);
  // const [randomItem, setRandomItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showList, setShowList] = useState(true);
  const [showMessage, setShowMessage] = useState(false); // "맛있게 먹어~" 메시지
  const [showSpinButton, setShowSpinButton] = useState(true); // "눌러" 버튼 표시
  const [showResetButton, setShowResetButton] = useState(false); // "다시 돌리기" 버튼 표시
  const [showPrompt, setShowPrompt] = useState(true); // "음식 골라줘?" 문구

  const rotateTime = 9000;

  useEffect(() => {
    if (result) {
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

  console.log(result);
  console.log(resultData);

  const startRotation = () => {
    // setHasSpun(true);
    setIsRotating(true); // 룰렛이 돌기 시작함을 설정
    const newPrizeNumber = Math.floor(
      Math.random() * categories.length
    );
    setPrizeNumber(newPrizeNumber);
    // setIsRotating(true);
    // setResult(categories[newPrizeNumber]);
    // setTimeout(() => {
    //   setResult(categories[newPrizeNumber]); // 결과 값을 설정
    //   setIsRotating(false); // 룰렛 멈춤을 설정
    // });
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
        setResult(resultData[randomIndex].f_foodname);
        setShowList(false); // 결과가 나온 후 List 숨김
        setShowMessage(true); // "맛있게 먹어~" 메시지 표시
        setShowSpinButton(false); // "눌러" 버튼 숨김
        setShowResetButton(true); // "다시 돌리기" 버튼 표시
        setShowPrompt(false); // "음식 골라줘?" 문구 숨김
      }, 3000);
    }
  };

  // useEffect(() => {
  //   if (randomItem) {
  //     console.log("Random Item:", randomItem.f_foodname);
  //   }
  // }, [randomItem]);
  const handleReset = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <RouletteContainer>
      <Typography variant="h4" gutterBottom>
        돌림판
      </Typography>
      <Button
        variant="contained"
        onClick={startRotation}
        disabled={isRotating}
        sx={{
          display: showSpinButton ? "inline-flex" : "none",
          backgroundColor: "#333",
          "&:hover": { backgroundColor: "#555" },
        }}
      >
        돌려
      </Button>
      <Wheel
        mustStartSpinning={isRotating}
        prizeNumber={prizeNumber}
        data={categories.map((category) => ({ option: category }))}
        onStopSpinning={() => {
          setIsRotating(false);
          setResult(categories[prizeNumber]);
        }}
      />
      {result && showPrompt && (
        <Typography variant="h6" gutterBottom>
          음식 골라줘?
        </Typography>
      )}
      {result && (
        <>
          {showList && (
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
                {resultData.length > 0 &&
                currentIndex < resultData.length ? (
                  <ListItem>
                    {resultData[currentIndex].f_foodname}
                  </ListItem>
                ) : (
                  <ListItem>데이터 없음</ListItem>
                )}
              </List>
            </Box>
          )}
          <Typography variant="h6" gutterBottom>
            {`결과: ${result}`}
          </Typography>
          {showMessage && (
            <Typography variant="h5" gutterBottom>
              맛있게 먹어~
            </Typography>
          )}
        </>
      )}
      {!isRotating && result && (
        <Button
          variant="contained"
          onClick={handleSpinAgain}
          sx={{
            marginTop: "20px",
            display: showSpinButton ? "inline-flex" : "none",
            backgroundColor: "#333",
            "&:hover": { backgroundColor: "#555" },
          }}
        >
          눌러
        </Button>
      )}
      {showResetButton && (
        <Button
          variant="contained"
          onClick={handleReset}
          sx={{
            marginTop: "20px",
            backgroundColor: "#333",
            "&:hover": { backgroundColor: "#555" },
          }}
        >
          다시 돌리기
        </Button>
      )}
    </RouletteContainer>
  );
};

export default Roulette;
