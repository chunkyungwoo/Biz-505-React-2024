import React, { useState } from "react";
import { useUserContext } from "../provider/UserProvider";
import "../css/login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("로그인 실패");
      }
      const data = await response.json();
      setUser(data.username);
    } catch (error) {
      setErrorMessage("아이디/비밀번호 오류");
    }
  };

  return (
    <div className="form-container">
      {user ? (
        <div>
          <h2>Welcome, {user}</h2>
          <button onClick={() => setUser(null)}>로그아웃</button>
        </div>
      ) : (
        <div>
          <h2>로그인</h2>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          <div className="input-group">
            <label>아이디:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="input-group">
            <label>비밀번호:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="button-container">
            <button onClick={handleLogin}>로그인</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
