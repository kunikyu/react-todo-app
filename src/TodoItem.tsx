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
    return <div className="mx-2 text-amber-400">{"★".repeat(4 - n)}</div>;
  } else {
    return <div className="mx-2 text-yellow-400">{"★".repeat(4 - n)}</div>;
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
          "flex rounded-md border bg-white px-3 py-2 drop-shadow-md items-center",
          todo.deadline
            ? dayjs(todo.deadline).isAfter(dayjs())
              ? dayjs(todo.deadline).isAfter(dayjs().add(1, "day"))
                ? "border-blue-500"
                : "border-yellow-500"
              : "border-red-500"
            : "border-black",
          todo.isDone && "bg-blue-50 opacity-50"
        )}
      >
        <div>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="mr-1.5 cursor-pointer items-center"
          />
        </div>
        <div className="w-full divide-y divide-blue-400">
          <div className="mb-1 flex">
            <div className="flex w-full items-center text-slate-700">
              <div className="sm:flex sm:w-full">
                <div className="flex items-baseline">
                  <FontAwesomeIcon
                    icon={faFile}
                    flip="horizontal"
                    className="mr-1"
                  />
                  <div
                    className={twMerge(
                      "text-lg font-bold ",
                      todo.isDone && "line-through decoration-2"
                    )}
                  >
                    {todo.name}
                  </div>
                  {num2star(todo.lie, todo.priority)}
                </div>
                <div
                  className={twMerge(
                    "ml-auto flex items-center text-sm",
                    dayjs(todo.deadline).isBefore(dayjs())
                      ? " text-red-500"
                      : " text-slate-500"
                  )}
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    flip="horizontal"
                    className="mr-1.5"
                  />
                  <div className={twMerge(todo.isDone && "line-through")}>
                    {/* 期限: {todo.deadline && <br className="my-sm:hidden" />} */}
                    {todo.deadline
                      ? dayjs(todo.deadline).format("YYYY-M/D H:m")
                      : "未設定"}
                  </div>
                </div>
              </div>
              <div className="ml-auto flex w-auto sm:ml-0">
                <button
                  onClick={() => {
                    setEditPopUpVisible(true);
                    if (todo.lie) props.setLiepopupState(3);
                  }}
                  className="ml-2 w-11 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-blue-500"
                >
                  編集
                </button>
                <button
                  onClick={() => props.remove(todo.id)}
                  className="ml-2 w-11 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
          <div className="">{todo.memo}</div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
