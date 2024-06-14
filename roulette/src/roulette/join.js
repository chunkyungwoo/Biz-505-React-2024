import React, { useState } from "react";
import "../css/join.css";

const Join = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    selectedFoodInput: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [idError, setIdError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") {
      await idCheckHandler(value);
    } else if (name === "password" || name === "confirmPassword") {
      passwordCheckHandler(name, value);
    }
  };

  const validateForm = () => {
    const { password, confirmPassword, email } = formData;
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (!email.includes("@")) {
      setErrorMessage("유효한 이메일 주소를 입력하세요.");
      return false;
    }
    return true;
  };

  const idDuplicateCheck = async (id) => {
    const response = await fetch(
      `http://localhost:8080/user/check-id/${id}`
    );
    if (!response.ok)
      throw new Error("서버 오류입니다. 관리자에게 문의하세요.");
    const result = await response.json();
    return result.isAvailable;
  };

  const idCheckHandler = async (id) => {
    const idRegex = /^[a-z\d]{5,10}$/;
    if (id === "") {
      setIdError("아이디를 입력해주세요.");
      return false;
    } else if (!idRegex.test(id)) {
      setIdError(
        "아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다."
      );
      return false;
    }
    try {
      const responseData = await idDuplicateCheck(id);
      if (responseData) {
        setIdError("사용 가능한 아이디입니다.");
        return true;
      } else {
        setIdError("이미 사용중인 아이디입니다.");
        return false;
      }
    } catch (error) {
      alert("서버 오류입니다. 관리자에게 문의하세요.");
      console.error(error);
      return false;
    }
  };

  const passwordCheckHandler = (name, value) => {
    if (name === "password") {
      setFormData({ ...formData, password: value });
      if (
        formData.confirmPassword &&
        value !== formData.confirmPassword
      ) {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPasswordError("");
      }
    } else if (name === "confirmPassword") {
      setFormData({ ...formData, confirmPassword: value });
      if (formData.password && value !== formData.password) {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const idCheckResult = await idCheckHandler(formData.username);
    if (!idCheckResult) return;

    try {
      const response = await fetch(
        "http://localhost:8080/user/join",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("회원가입 실패");
      alert("회원가입 성공!");
    } catch (error) {
      setErrorMessage("회원가입 실패");
    }
  };

  const handleAddFood = () => {
    const { selectedFoodInput } = formData;
    if (selectedFoodInput.trim() !== "") {
      setSelectedFoods([...selectedFoods, selectedFoodInput]);
      setFormData({ ...formData, selectedFoodInput: "" });
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
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={() => idCheckHandler(formData.username)} // 아이디 입력 후 포커스가 벗어날 때 중복 검사 실행
          />
          {idError && <small>{idError}</small>}
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {confirmPasswordError && (
            <small>{confirmPasswordError}</small>
          )}
        </div>
        <div>
          <label>이메일:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>좋아하는 음식:</label>
          <input
            type="text"
            name="selectedFoodInput"
            value={formData.selectedFoodInput}
            onChange={handleChange}
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
