import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function Menu() {
    const navigate = useNavigate();
  return (
    <Container>
      <p onClick={() => navigate("/habitos")}>Hábitos</p>
      <div onClick={() => navigate("/hoje")}>Hoje</div>
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
  display:flex;
  justify-content:space-around;
  align-items:center;
  box-shadow: -2px 0 8px #8c8b8b;
  
  p{
      color:#52B6FF;
      cursor: pointer;
  }
  div{
      background-color:#52B6FF;
      color:white;
      margin-bottom:40px;
      width:100px;
      height:100px;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius:100px;
      cursor: pointer;
  }
`;

