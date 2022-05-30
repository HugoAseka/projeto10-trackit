import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import React from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let { setBody } = useContext(UserContext);
  const regObj = {
    email,
    password,
  };

  function registerAPI(event) {
    event.preventDefault();
    setLoading(true);
    const requisition = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      regObj
    );
    requisition
      .then((response) => {
        setBody({
          email: response.data.email,
          name: response.data.name,
          image: response.data.image,
          token: response.data.token,
        });
        setLoading(false);
        navigate("/hoje");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Email ou senha inválidos, tente novamente.");
        }
        setLoading(false);
      });
  }

  return (
    <Container>
      <Logo>
        <img src="./logo.png" alt="logo" />
      </Logo>
      <Inputs loading={loading} onSubmit={registerAPI}>
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

        <button disabled={loading} type="submit">
          {loading ? <ThreeDots color="white" /> : "Entrar"}
        </button>
        <span>
          <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </span>
      </Inputs>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  background-color: #fafafa;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
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
    height: 50px;
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
    text-align: center;
  }
`;
