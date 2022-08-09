import React, { useState } from "react";
import css from "./ToDoItem.module.scss";

function ToDoItem(props) {
  const { id, toDo, isCompleted, setIsUpdated } = props;
  const token = localStorage.getItem("token");
  const [update, setUpdate] = useState(false);

  const [newToDo, setNewToDo] = useState(toDo);
  const handleTodoInput = (e) => {
    setNewToDo(e.target.value);
  };

  const [isCompletedTodo, setIsCompletedTodo] = useState(isCompleted);
  const handleCompletedInput = () => {
    setIsCompletedTodo(!isCompletedTodo);
  };

  const deleteTodo = () => {
    fetch(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      if (res.status === 204) {
        setIsUpdated(true);
      }
    });
  };

  const updateBtn = () => {
    if (!update) {
      setUpdate(true);
    } else {
      updateTodo();
    }
  };
  const cancelBtn = () => {
    setUpdate(false);
    setNewToDo(toDo);
    setIsCompletedTodo(isCompleted);
  };

  const updateTodo = () => {
    fetch(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          todo: newToDo,
          isCompleted: isCompletedTodo,
        }),
      }
    ).then((res) => {
      if (res.status === 200) {
        setIsUpdated(true);
        setUpdate(false);
      }
    });
  };

  return (
    <div className={css.container}>
      <li className={css.list}>
        {toDo}
        {update && (
          <input
            className={css.input}
            value={newToDo}
            onChange={handleTodoInput}
          />
        )}
        {update ? (
          <input
            type="checkbox"
            value={isCompletedTodo}
            checked={isCompletedTodo}
            onChange={handleCompletedInput}
          />
        ) : (
          <input
            type="checkbox"
            value={isCompletedTodo}
            checked={isCompletedTodo}
            readOnly
            style={{ cursor: "not-allowed" }}
          />
        )}
        <button className={css.updateBtn} onClick={updateBtn}>
          수정
        </button>
        {update && (
          <button className={css.cancelBtn} onClick={cancelBtn}>
            취소
          </button>
        )}
        <button className={css.deleteBtn} onClick={deleteTodo}>
          삭제
        </button>
      </li>
    </div>
  );
}

export default ToDoItem;
