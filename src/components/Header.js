import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import styled from "styled-components";

export default function Header() {
  const { body } = useContext(UserContext);

  return (
    <Container>
      <span>Trackit</span>
      <img src={body.image} alt="foto perfil" />
    </Container>
  );
}
const Container = styled.header`
  max-width: 612px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #126ba5;
  height: 80px;
  font-family: Playball, cursive;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
  padding-left: 30px;
  padding-right: 20px;
  color: white;
  box-shadow: 4px 0px 10px black;
  z-index: 1;

  img {
    height: 80%;
    width: auto;
    border-radius: 60%;
  }
`;
