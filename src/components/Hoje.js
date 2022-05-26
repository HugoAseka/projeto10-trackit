import axios from "axios";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import Header from "./Header";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
export default function Hoje() {
  const navigate = useNavigate();
  let { body } = useContext(UserContext);
  const config = {
    headers: {
      Authorization: `Bearer ${body.token}`,
    },
  };

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, []);

  return (
    <>
      <Header />
      <Menu />
    </>
  );
}
