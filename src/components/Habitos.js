import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import Header from "./Header";
import Menu from "./Menu";
import styled from "styled-components";
import axios from "axios";

function AddNewHabit({
  setShowAddNewHabit,
  name,
  setName,
  days,
  weekDays,
  setWeekDays,
  importHabits
}) {
  const { body } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${body.token}` },
  };

  function createHabit() {
    for (let i = 1; i < 7; i++) {
      if (weekDays[i].selected === true) days.push(i);
    }
    if (weekDays[0].selected === true) days.push(7);
    const body = { name, days };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      config
    );
    promise
      .then((response) => {
        console.log(response.data);
        setName("");
        days = [];
        setShowAddNewHabit(false);
        for (let i = 0; i < weekDays.length; i++) {
          weekDays[i].selected = false;
        }
        importHabits();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <NewHabit>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="nome do hábito"
        value={name}
      />
      <div>
        {weekDays.map((e, index) => (
          <Day
            key={index}
            selected={e.selected}
            onClick={() => {
              e.selected = !e.selected;
              setWeekDays([...weekDays]);
            }}
          >
            {e.name}
          </Day>
        ))}
      </div>
      <Bottom>
        <p onClick={() => setShowAddNewHabit(false)}>Cancelar</p>
        <div onClick={createHabit}>Salvar</div>
      </Bottom>
    </NewHabit>
  );
}

function RenderHabits({ habits, weekDays }) {
  function selected(k) {
    const aux = [];
    for (let j = 0; j < habits[k].days.length; j++) {
      if (7 === habits[k].days[j]) {
        aux.push(true);
        break;
      }
    }
    if (aux.length === 0) aux.push(false);

    for (let i = 1; i < 7; i++) {
      for (let j = 0; j < habits[k].days.length; j++) {
        if (i === habits[k].days[j]) {
          aux.push(true);
          break;
        }
      }
      if (aux.length !== i + 1) aux.push(false);
    }
    return aux;
  }
  const selectedArr = habits.map((el, k) => selected(k));

  if (habits.length === 0) {
    return (
      <NoHabits>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </NoHabits>
    );
  } else {
    return (
      <>
        {habits.map((el, i) => {
          return (
            <NewHabit key={el.id}>
              <p>{el.name}</p>
              <div>
                {weekDays.map((e, index) => (
                  <Day selected={selectedArr[i][index]} key={index}>
                    {e.name}
                    
                  </Day>
                ))}
              </div>
              <ion-icon name="trash-outline"></ion-icon>
            </NewHabit>
          );
        })}
      </>
    );
  }
}

export default function Habits() {
  const [showAddNewHabit, setShowAddNewHabit] = useState(false);
  const [name, setName] = useState("");
  let days = [];
  const [weekDays, setWeekDays] = useState([
    { name: "D", selected: false },
    { name: "S", selected: false },
    { name: "T", selected: false },
    { name: "Q", selected: false },
    { name: "Q", selected: false },
    { name: "S", selected: false },
    { name: "S", selected: false },
  ]);
  const { body } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${body.token}` },
  };
  
  const [habits, setHabits] = useState([]);

  function importHabits() {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise
      .then((response) => {
        setHabits([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  useEffect(() => importHabits(), []);

  return (
    <>
      <Header />
      <Container>
        <Add>
          <p> Meus Hábitos</p>
          <ion-icon
            onClick={() => setShowAddNewHabit(!showAddNewHabit)}
            name="add-outline"
          ></ion-icon>
        </Add>
        {showAddNewHabit ? (
          <AddNewHabit
            setShowAddNewHabit={setShowAddNewHabit}
            name={name}
            setName={setName}
            days={days}
            weekDays={weekDays}
            setWeekDays={setWeekDays}
            importHabits={importHabits}
          />
        ) : (
          ""
        )}
        <RenderHabits habits={habits} weekDays={weekDays} />
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
`;
const Add = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  font-size: 30px;
  color: #126ba5;

  ion-icon {
    background-color: #52b6ff;
    border-radius: 6px;
    color: white;
    cursor: pointer;
  }
`;
const NewHabit = styled.div`
  background-color: #ffffff;
  width: 90%;
  padding: 20px;
  margin-top: 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position:relative;

  input {
    width: 100%;
    border-radius: 4px;
    border: 2px solid #d4d4d4;
    height: 40px;
  }
  div {
    width: 100%;
    display: flex;
    gap: 6px;
  }
  ion-icon{
      position:absolute;
      right: 10px;
      top: 10px;
  }
`;
const Day = styled.button`
  border: 2px solid #d4d4d4;
  border-radius: 4px;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  color: ${({ selected }) => (selected ? "#ffffff" : "#d4d4d4")};
  background-color: ${({ selected }) => (selected ? "#d4d4d4" : "#ffffff")};
  cursor: pointer;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  align-items: center;
  p {
    background-color: #ffffff;
    color: #52b6ff;
    display: flex;
    flex-direction: center;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
  }
  div {
    background-color: #52b6ff;
    color: white;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
  }
`;
const NoHabits = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  margin-top: 50px;
  font-weight: 300;
`;
