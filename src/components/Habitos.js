import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import Header from "./Header";
import Menu from "./Menu";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function AddNewHabit({
  setShowAddNewHabit,
  name,
  setName,
  days,
  weekDays,
  setWeekDays,
  importHabits,
}) {
  const { body } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${body.token}` },
  };
  let [loading, setLoading] = useState(false);

  function createHabit() {
    setLoading(true);
    for (let i = 0; i < weekDays.length; i++) {
      if (weekDays[i].selected === true) days.push(i + 1);
    }
    const body = { name, days };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      config
    );
    promise
      .then(() => {
        setName("");
        days = [];
        setShowAddNewHabit(false);
        setLoading(false);
        for (let i = 0; i < weekDays.length; i++) {
          weekDays[i].selected = false;
        }
        importHabits();
      })
      .catch((error) => {
        setLoading(false);
        const status  = error.response.request.status;
        if(status === 422) alert('Nome do hábito não pode estar vazio!')
      });
  }
  return (
    <NewHabit>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="nome do hábito"
        value={name}
        disabled={loading}
      />
      <div>
        {weekDays.map((e, index) => (
          <Day
            key={index}
            selected={e.selected}
            disabled={loading}
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
        <button disabled={loading} onClick={createHabit}>
          {loading ? <ThreeDots color="white" /> : "Salvar"}
        </button>
      </Bottom>
    </NewHabit>
  );
}

function RenderHabits({ habits, weekDays, importHabits }) {
  let [confirmDelete, setConfirmDelete] = useState([]);
  function updateDelete() {
    setConfirmDelete([]);
    for (let i = 0; i < habits.length; i++) confirmDelete.push(false);
  }
  useEffect(() => {
    updateDelete();
  }, [habits]);
  function selected(k) {
    const aux = [];
    for (let i = 1; i < 8; i++) {
      for (let j = 0; j < habits[k].days.length; j++) {
        if (i === habits[k].days[j]) {
          aux.push(true);
          break;
        }
      }
      if (aux.length !== i) aux.push(false);
    }
    return aux;
  }
  const { body } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${body.token}` },
  };
  const selectedArr = habits.map((el, k) => selected(k));
  function confirm(i) {
    confirmDelete[i] = !confirmDelete[i];
    setConfirmDelete([...confirmDelete]);
    console.log(confirmDelete);
  }

  function deleteHabit(id) {
    const promise = axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
      config
    );
    promise
      .then(() => {
        importHabits();
        console.log(confirmDelete);
      })
      .catch((error) => {
        alert(error.data);
      });
  }

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
              {confirmDelete[i] ? (
                <Del onClick={() => deleteHabit(el.id)}>Deletar</Del>
              ) : (
                <ion-icon
                  onClick={() => confirm(i)}
                  name="trash-outline"
                ></ion-icon>
              )}
            </NewHabit>
          );
        })}
      </>
    );
  }
}

export default function Habits() {
  const navigate = useNavigate();
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
        const status = error.response.request.status;
        console.log(error.response.request.status);
        if (status === 401) {
          alert("Login expirado!");
          navigate("/");
        }
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
        <RenderHabits
          importHabits={importHabits}
          habits={habits}
          weekDays={weekDays}
        />
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
  position: relative;

  input {
    width: 100%;
    border-radius: 4px;
    border: 2px solid #d4d4d4;
    height: 40px;
  }
  > div {
    width: 100%;
    display: flex;
    gap: 6px;
  }
  ion-icon {
    position: absolute;
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
  button {
    background-color: #52b6ff;
    color: white;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
    border: none;
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

const Del = styled.p`
  width: 70px;
  height: 20px;
  background-color: red;
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
