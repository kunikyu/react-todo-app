import React, { useState } from "react";
import dayjs from "dayjs";
import { Todo } from "./types";
import { set } from "date-fns";

type Props = {
  todos: Todo[];
  setEditPopUpVisible: (isPopUpVisible: boolean) => void;
  isEditPopUpVisible: boolean;
  setTodos: (todos: Todo[]) => void;
  id: string;
};

const EditPop = (props: Props) => {
  const todos = props.todos;
  const todo = todos.find((todo) => todo.id === props.id) as Todo;

  const [updatedTodoName, setUpdatedTodoName] = useState(todo.name);
  const [updatedTodoPriority, setUpdatedTodoPriority] = useState(todo.priority);
  const [updatedTodoDeadline, setUpdatedTodoDeadline] = useState(todo.deadline);
  const [updatedTodoMemo, setUpdatedTodoMemo] = useState(todo.memo);

  const isPopUpVisible = props.isEditPopUpVisible;
  const setIsPopUpVisible = props.setEditPopUpVisible;
  const handleSave = () => {
    const updatedTodos = props.todos.map((todo) => {
      if (todo.id === props.id) {
        const tempTodo = {
          ...todo,
          name: updatedTodoName,
          priority: updatedTodoPriority,
          deadline: updatedTodoDeadline,
          memo: updatedTodoMemo,
        };
        return tempTodo;
      } else {
        return todo;
      }
    });
    props.setTodos(updatedTodos);
    setIsPopUpVisible(false);
  };
  const handleCancel = () => {
    setIsPopUpVisible(false);
    setUpdatedTodoName(todo.name);
    setUpdatedTodoPriority(todo.priority);
    setUpdatedTodoDeadline(todo.deadline);
    setUpdatedTodoMemo(todo.memo);
  };
  return (
    <div>
      {isPopUpVisible && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="h-max w-full max-w-2xl rounded-md bg-gray-100 p-5 shadow-lg">
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
                  value={updatedTodoName}
                  onChange={(e) => setUpdatedTodoName(e.target.value)}
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
                    checked={updatedTodoPriority === value}
                    onChange={() => setUpdatedTodoPriority(value)}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
            {!todo.lie && (
              <div className="flex items-center gap-x-2">
                <label htmlFor="deadline" className="font-bold">
                  期限
                </label>
                <input
                  type="datetime-local"
                  id="deadline"
                  value={
                    updatedTodoDeadline
                      ? dayjs(updatedTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                      : ""
                  }
                  onChange={(e) => {
                    setUpdatedTodoDeadline(dayjs(e.target.value).toDate());
                  }}
                  className="rounded-md border border-gray-400 px-2 py-0.5"
                />
              </div>
            )}
            <div>
              <label className="font-bold" htmlFor="memo">
                メモ
              </label>
              <textarea
                id="memo"
                className="w-full rounded-md border border-gray-400 p-2"
                value={updatedTodoMemo}
                onChange={(e) => setUpdatedTodoMemo(e.target.value)}
                rows={3}
              ></textarea>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsPopUpVisible(false);
                  handleSave();
                }}
                className={
                  "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
                }
              >
                保存
              </button>
              <button
                type="button"
                onClick={() => handleCancel()}
                className={
                  "rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
                }
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPop;
