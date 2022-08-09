import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDoItem from "./ToDoItem";
import css from "./ToDo.module.scss";

function ToDo(props) {
  const { isLogin } = props;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [toDoList, setToDoList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [toDo, setToDo] = useState("");
  const handleToDo = (e) => {
    setToDo(e.target.value);
  };
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [isLogin]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  const createTodo = () => {
    if (toDo !== "") {
      fetch(
        "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            todo: toDo,
          }),
        }
      )
        .then((res) => res.json())
        .then(setIsUpdated(true))
        .then(setToDo(""));
    } else {
      alert("할 일을 입력해주세요!");
    }
  };

  useEffect(() => {
    setIsUpdated(false);
    if (isLogin) {
      fetch(
        "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setToDoList(res);
        });
    }
  }, [isUpdated]);

  return (
    <div className={css.container}>
      <input className={css.input} value={toDo} onChange={handleToDo} />
      <button className={css.btn} onClick={createTodo}>
        추가
      </button>
      {toDoList.map((toDo) => {
        return (
          <ToDoItem
            key={toDo.id}
            id={toDo.id}
            toDo={toDo.todo}
            isCompleted={toDo.isCompleted}
            setIsUpdated={setIsUpdated}
          />
        );
      })}
    </div>
  );
}

export default ToDo;
