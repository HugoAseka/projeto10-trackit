import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import React from "react";
export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const regObj = {
    email,
    name,
    image,
    password,
  };

  function registerAPI(event) {
    event.preventDefault();
    setLoading(true);
    const requisition = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      regObj
    );
    requisition
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("Usuário já existente. Tente novamente!");
        }
        setLoading(false);
      });
  }

  return (
    <Container>
      <Logo>
        <img src="./logo.png" alt="logo" />
      </Logo>
      <Inputs loading={loading}onSubmit={registerAPI}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="text"
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="url"
          placeholder="foto"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          disabled={loading}
          required
        />
        <button disabled={loading} type="submit">
          {loading ? <ThreeDots color="white" /> : "Cadastrar"}
        </button>
        <span>
          <Link to="/">Já tem uma conta? Faça um login</Link>
        </span>
      </Inputs>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  background-color: #fafafa;
  min-height: 100vh;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Inputs = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: 10px;

  input {
    height: 40px;
    border-radius: 6px;
    width: 100%;
    border: 1px ridge #d4d4d4;
    padding-left: 20px;
    font-size: 20px;
  }
  button {
    width: 100%;
    height: 40px;
    border-radius: 6px;
    font-size: 20px;
    background-color: #52b6ff;
    opacity: ${({loading}) => loading ? 0.7 : 1};
    border: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    margin-top: 20px;
    color: #52b6ff;
  }
`;
