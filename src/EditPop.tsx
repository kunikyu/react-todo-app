import React from "react";
import dayjs from "dayjs";
import { Todo } from "./types";

type Props = {
  todos: Todo[];
  setEditPopUpVisible: (isPopUpVisible: boolean) => void;
  isEditPopUpVisible: boolean;
  setTodos: (todos: Todo[]) => void;
  id: string;
};

const EditPop = (props: Props) => {
  const setPopUpVisible = props.setEditPopUpVisible;
  const isPopUpVisible = props.isEditPopUpVisible;
  const todos = props.todos;
  const todo = todos.find((todo) => todo.id === props.id) as Todo;
  const updateTodoName = (id: string, value: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (!todo.lie) {
          return { ...todo, name: value }; // スプレッド構文
        } else {
          return todo;
        }
      } else {
        return todo;
      }
    });
    props.setTodos(updatedTodos);
  };

  const updateTodopriority = (id: string, value: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (!todo.lie) {
          return { ...todo, priority: value }; // スプレッド構文
        } else {
          return todo;
        }
      } else {
        return todo;
      }
    });
    props.setTodos(updatedTodos);
  };

  const updateTododeadline = (id: string, value: Date) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (!todo.lie) {
          return { ...todo, deadline: value }; // スプレッド構文
        } else {
          return todo;
        }
      } else {
        return todo;
      }
    });
    props.setTodos(updatedTodos);
  };

  const updateTodomemo = (id: string, value: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (!todo.lie) {
          return { ...todo, memo: value }; // スプレッド構文
        } else {
          return todo;
        }
      } else {
        return todo;
      }
    });
    props.setTodos(updatedTodos);
  };
  return (
    <div>
      {isPopUpVisible && (
          <div className="fixed left-0 top-0 z-40 size-full bg-black/50"></div>
        ) && (
          <div className="fixed left-1/2 top-1/2 z-10 size-full max-h-max max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-100 p-5 shadow-lg">
            <h2 className="text-lg font-bold">タスクの編集</h2>
            {/* 編集: ここから... */}
            <div>
              <div className="flex items-center space-x-2">
                <label className="font-bold" htmlFor="newTodoName">
                  名前
                </label>
                <input
                  id="newTodoName"
                  type="text"
                  value={todo.name}
                  onChange={(e) => updateTodoName(todo.id, e.target.value)}
                  className={"grow rounded-md border p-2"}
                  placeholder="課題の名前を書け"
                />
              </div>
            </div>
            {/* ...ここまで */}

            <div className="flex gap-5">
              <div className="font-bold">優先度</div>
              {[1, 2, 3].map((value) => (
                <label key={value} className="flex items-center space-x-1">
                  <input
                    id={`priority-${value}`}
                    name="priorityGroup"
                    type="radio"
                    value={value}
                    checked={todo.priority === value}
                    onChange={() => updateTodopriority(todo.id, value)}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center gap-x-2">
              <label htmlFor="deadline" className="font-bold">
                期限
              </label>
              <input
                type="datetime-local"
                id="deadline"
                value={
                  todo.deadline
                    ? dayjs(todo.deadline).format("YYYY-MM-DDTHH:mm:ss")
                    : ""
                }
                onChange={(e) => {
                  updateTododeadline(todo.id, e.target.valueAsDate as Date);
                }}
                className="rounded-md border border-gray-400 px-2 py-0.5"
              />
            </div>
            <div>
              <label className="font-bold" htmlFor="memo">
                メモ
              </label>
              <textarea
                id="memo"
                className="w-full rounded-md border border-gray-400 p-2"
                value={todo.memo}
                onChange={(e) => updateTodomemo(todo.id, e.target.value)}
                rows={3}
              ></textarea>
            </div>
            <button
              type="button"
              onClick={() => {
                setPopUpVisible(false);
                props.setTodos(todos);
              }}
              className={
                "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
              }
            >
              保存
            </button>
          </div>
        )}
    </div>
  );
};

export default EditPop;
