import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import Header from "./Header";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

export default function Hoje() {
  const indexCurrentWeekDay = dayjs().format("d");
  const dayAndMonth = dayjs().format("DD/MM");
  let currentWeekDay = "";

  if (indexCurrentWeekDay === "0") {
    currentWeekDay = "Domingo";
  } else if (indexCurrentWeekDay === "1") {
    currentWeekDay = "Segunda";
  } else if (indexCurrentWeekDay === "2") {
    currentWeekDay = "Terça";
  } else if (indexCurrentWeekDay === "3") {
    currentWeekDay = "Quarta";
  } else if (indexCurrentWeekDay === "4") {
    currentWeekDay = "Quinta";
  } else if (indexCurrentWeekDay === "5") {
    currentWeekDay = "Sexta";
  } else if (indexCurrentWeekDay === "6") {
    currentWeekDay = "Sábado";
  }
  const navigate = useNavigate();
  let { body } = useContext(UserContext);
  const config = {
    headers: {
      'Authorization': `Bearer ${body.token}`,
    },
  };
  let [percent, setPercent] = useState(0);
  const [habits, setHabits] = useState([]);

  function updatePercentage() {
    if (habits.length > 0) {
      let aux = 0;
      for (let i = 0; i < setHabits.length; i++) {
        if (habits[i].done === true) aux++;
      }
      setPercent((aux / habits.length) * 100);
    }
  }

  useEffect(() => updatePercentage(), [habits]);
  function importHabits(){
    const promise = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        config
      );
      promise
        .then((response) => {
          console.log(response);
          setHabits([...response.data]);
        })
        .catch((error) => {
          console.log(error);
          navigate("/");
        });
  }
  useEffect(() => importHabits(), []);
  function done(id) {
    const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
        null,
        config
      );
      promise
        .then(() => importHabits() )
        .catch((error) => console.log(error.response));
  }
  return (
    <>
      <Header />
      <Container>
        <Add>
          {currentWeekDay}, {dayAndMonth}
        </Add>
        <ProgressSubtitle>
          {percent === 0 ? (
            <p>Nenhum hábito concluído ainda</p>
          ) : (
            <PercentProgress>
              {percent.toFixed(0) + "%"} dos hábitos concluídos
            </PercentProgress>
          )}
        </ProgressSubtitle>
        {habits.map((el, ind) => {
          return (
            <Habit done={el.done} key={ind}>
              <h3>{el.name}</h3>
              <p>Sequência atual: {el.currentSequence} dias</p>
              <p>Seu recorde: {el.highestSequence} dias</p>
              <ion-icon
                onClick={() => done(el.id)}
                
                name="checkmark-outline"
              ></ion-icon>
            </Habit>
          );
        })}
      </Container>
      <Menu />
    </>
  );
}
const Container = styled.div`
  margin-top: 80px;
  padding-bottom: 100px;
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
  margin: 10px 0;
  p {
    color: #bababa;
  }
`;

const PercentProgress = styled.div`
  color: #8fc549;
`;
const Habit = styled.div`
  background-color: #ffffff;
  width: 90%;
  padding: 20px;
  margin-top: 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #666666;
  font-size: 12px;
  position: relative;
  p {
    max-width: 60%;
  }

  h3 {
    font-size: 20px;
    padding-bottom: 10px;
    max-width: 60%;
  }
  ion-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-40px);
    font-size: 80px;
    background-color: ${({ done }) => (done ? "#8fc549" : "#666666")};
    border-radius: 10px;
    color: white;
  }
`;
