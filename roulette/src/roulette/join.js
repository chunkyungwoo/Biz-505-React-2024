import React, { useState } from "react";
import "../css/join.css";
const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedFoodInput, setSelectedFoodInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지않습니다.");
      return;
    }
    // 클라이언트에서 간단한 이메일 유효성 검사
    if (!email.includes("@")) {
      setErrorMessage("유효한 이메일 주소를 입력하세요.");
      return;
    }
    try {
      const response = await fetch("/user/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
      if (!response.ok) {
        throw new Error("회원가입 실패");
      }
    } catch (error) {
      setErrorMessage("회원가입 실패");
    }
  };

  const handleAddFood = () => {
    if (selectedFoodInput.trim() !== "") {
      setSelectedFoods([...selectedFoods, selectedFoodInput]);
      setSelectedFoodInput("");
    }
  };
  return (
    <div className="join-container">
      <h2>회원가입</h2>
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>이메일:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>좋아하는 음식:</label>
          <input
            type="text"
            value={selectedFoodInput}
            onChange={(e) => setSelectedFoodInput(e.target.value)}
          />
          <button type="button" onClick={handleAddFood}>
            추가
          </button>
        </div>
        <div>
          선택한 음식:
          <ul>
            {selectedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};
export default Join;
