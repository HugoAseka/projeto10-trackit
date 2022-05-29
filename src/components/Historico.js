import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function Historico() {
  const { percent } = React.useContext(UserContext);
  return (
    <>
      <Header />
      <Container>
        <Add>Historico</Add>
        <ProgressSubtitle>
          Em breve você poderá ver o histórico dos seus hábitos aqui!
        </ProgressSubtitle>
      </Container>
      <Menu percentage={percent} />
    </>
  );
}
const Container = styled.div`
  margin-top: 80px;
  padding-bottom: 120px;
  background-color: #e5e5e5;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
const Add = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  font-size: 30px;
  color: #126ba5;
`;
const ProgressSubtitle = styled.div`
  width: 90%;
  margin: 20px 0;
  color: #666666;
`;
