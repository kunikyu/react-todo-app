import React, { useState } from "react";
import { Todo } from "./types";
import EditPop from "./EditPop";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faClock } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todos: Todo[];
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
  setLiepopupState: (value: number) => void;
};
const num2star = (lie: boolean, n: number): JSX.Element => {
  if (lie) {
    return <div className="ml-2 text-amber-400">{"★".repeat(4 - n)}</div>;
  } else {
    return <div className="ml-2 text-yellow-400">{"★".repeat(4 - n)}</div>;
  }
};

const TodoItem = (props: Props) => {
  const [isEditPopUpVisible, setEditPopUpVisible] = useState(false);
  const todo = props.todo;
  return (
    <div>
      <EditPop
        todos={props.todos}
        isEditPopUpVisible={isEditPopUpVisible}
        setEditPopUpVisible={setEditPopUpVisible}
        setTodos={props.setTodos}
        id={todo.id}
      />

      <div
        key={todo.id}
        className={twMerge(
          "rounded-md border border-slate-500 bg-white px-3 py-2 drop-shadow-md",
          todo.isDone && "bg-blue-50 opacity-50"
        )}
      >
        <div className="flex items-baseline text-slate-700">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="mr-1.5 cursor-pointer"
          />
          <FontAwesomeIcon icon={faFile} flip="horizontal" className="mr-1" />
          <div
            className={twMerge(
              "text-lg font-bold",
              todo.isDone && "line-through decoration-2"
            )}
          >
            {todo.name}
          </div>
          <div className="ml-2">優先度 </div>
          {num2star(todo.lie, todo.priority)}
          {todo.deadline && (
            <div className="ml-4 flex items-center text-sm text-slate-500">
              <FontAwesomeIcon
                icon={faClock}
                flip="horizontal"
                className="mr-1.5"
              />
              <div className={twMerge(todo.isDone && "line-through")}>
                期限: {dayjs(todo.deadline).format("YYYY年M月D日 H時m分")}
              </div>
            </div>
          )}
          <button
            onClick={() => {
              setEditPopUpVisible(true);
              if (todo.lie) props.setLiepopupState(3);
            }}
            className="ml-auto mr-2 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-blue-500"
          >
            編集
          </button>
          <button
            onClick={() => props.remove(todo.id)}
            className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
          >
            削除
          </button>
        </div>

        <div className="ml-5 font-bold">{todo.memo}</div>
      </div>
    </div>
  );
};

export default TodoItem;
