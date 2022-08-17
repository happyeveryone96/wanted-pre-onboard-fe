import React, { useState } from "react";
import css from "./TodoItem.module.scss";

function TodoItem(props) {
  const { id, todo, isCompleted, setIsUpdated } = props;
  const token = localStorage.getItem("token");

  const [newTodo, setNewTodo] = useState(todo);
  const handleTodoInput = (e) => setNewTodo(e.target.value);

  const [isCompletedTodo, setIsCompletedTodo] = useState(isCompleted);
  const handleCompletedInput = () => setIsCompletedTodo(!isCompletedTodo);

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
      if (res.status === 204) setIsUpdated(true);
    });
  };

  const [update, setUpdate] = useState(false);
  const updateBtn = () => {
    !update ? setUpdate(true) : updateTodo();
  };

  const cancelBtn = () => {
    setUpdate(false);
    setNewTodo(todo);
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
          todo: newTodo,
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
        <span
          className={`${css.text} ${update ? css.inline : css.inlineBlock}`}
        >
          {!update && todo}
        </span>
        {update && (
          <input
            className={css.input}
            value={newTodo}
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

export default TodoItem;
