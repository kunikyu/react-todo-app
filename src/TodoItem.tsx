import React, { useState } from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faClock } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
  setLiepopupState: (value: number) => void;
  EditPopUpId: string;
  setEditPopUpId: (value: string) => void;
};
const num2star = (lie: boolean, n: number): JSX.Element => {
  return (
    <div
      className={twMerge("mx-2", lie ? "text-amber-400" : "text-yellow-400")}
    >
      {"★".repeat(n)}
    </div>
  );
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div>
      <div
        key={todo.id}
        className={twMerge(
          "flex rounded-md border bg-white px-3 py-2 drop-shadow-md items-center",
          todo.deadline
            ? dayjs(todo.deadline).isAfter(dayjs())
              ? !todo.isDone
                ? dayjs(todo.deadline).isAfter(dayjs().add(1, "day"))
                  ? "border-blue-500"
                  : "border-yellow-500"
                : "border-slate-500"
              : "border-red-500"
            : !todo.isDone
              ? "border-black"
              : "border-slate-500",
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
        <div className="w-full divide-y divide-slate-200">
          <div className="mb-1 flex w-full items-center text-slate-700">
            <div
              className="w-full cursor-default sm:flex sm:w-full"
              onClick={() => props.updateIsDone(todo.id, !todo.isDone)}
            >
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
                  !todo.deadline || dayjs(todo.deadline).isAfter(dayjs())
                    ? " text-slate-500"
                    : " text-red-500"
                )}
              >
                <FontAwesomeIcon
                  icon={faClock}
                  flip="horizontal"
                  className={twMerge(
                    "mr-1.5",
                    todo.deadline
                      ? dayjs(todo.deadline).isAfter(dayjs())
                        ? dayjs(todo.deadline).isAfter(dayjs().add(1, "day"))
                          ? "text-blue-500"
                          : "text-yellow-500"
                        : "text-red-500"
                      : "text-slate-500"
                  )}
                />
                <div className={twMerge(todo.isDone && "line-through")}>
                  {/* 期限: {todo.deadline && <br className="my-sm:hidden" />} */}
                  {todo.deadline
                    ? dayjs(todo.deadline).format("YYYY-M/D H:m")
                    : "未設定"}
                </div>
              </div>
            </div>
            <div className="flex w-auto sm:ml-0">
              <button
                onClick={() => {
                  if (todo.lie) props.setLiepopupState(3);
                  else props.setEditPopUpId(todo.id);
                }}
                className="z-10 ml-2 w-11 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-blue-500"
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
          {todo.memo && <div className="">{todo.memo}</div>}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
