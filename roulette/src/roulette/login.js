import React, { useState } from "react";
import { useUserContext } from "../provider/UserProvider";

const Login = () => {
  const { user } = useUserContext();
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
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user}</h2>
          <button onClick={() => setUser(null)}>로그아웃</button>
        </div>
      ) : (
        <div>
          <h2>로그인</h2>
          {errorMessage && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </div>
  );
};
export default Login;
