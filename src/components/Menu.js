import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import React from "react";
export default function Menu() {
  const navigate = useNavigate();
  let { percent } = useContext(UserContext);
  return (
    <Container>
      <p onClick={() => navigate("/habitos")}>Hábitos</p>
      <CenterContainer>
        <Center>
          <CircularProgressbar
            onClick={() => navigate("/hoje")}
            value={percent}
            text="Hoje"
            background={true}
            styles={{
              root: {},
              path: {
                stroke: "#FFFFFF",
              },
              trail: {
                stroke: "#52b6ff",
              },
              text: {
                fill: "#ffffff",
              },
              background: {
                fill: "#52b6ff",
              },
            }}
          />
        </Center>
      </CenterContainer>
      <p onClick={() => navigate("/historico")}>Histórico</p>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: -2px 0 8px #8c8b8b;

  p {
    color: #52b6ff;
    cursor: pointer;
  }
`;
const CenterContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: #52b6ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;
const Center = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  cursor: pointer;
`;
