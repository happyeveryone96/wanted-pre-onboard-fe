import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoItem";
import css from "./Todo.module.scss";

function Todo() {
  const [todo, setTodo] = useState("");
  const handleTodo = (e) => setTodo(e.target.value);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) navigate("/");
  }, []);

  const [isUpdated, setIsUpdated] = useState(false);
  const createTodo = () => {
    if (todo !== "") {
      fetch(
        "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ todo }),
        }
      )
        .then((res) => res.json())
        .then(setIsUpdated(true))
        .then(setTodo(""));
    } else alert("할 일을 입력해주세요!");
  };

  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    setIsUpdated(false);
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
      .then((res) => setTodoList(res));
  }, [isUpdated]);

  return (
    <div className={css.container}>
      <div className={css.inputWrap}>
        <input className={css.input} value={todo} onChange={handleTodo} />
        <button className={css.btn} onClick={createTodo}>
          추가
        </button>
      </div>

      {todoList.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            isCompleted={todo.isCompleted}
            setIsUpdated={setIsUpdated}
          />
        );
      })}
    </div>
  );
}

export default Todo;
