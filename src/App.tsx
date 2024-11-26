import { useState, useEffect } from "react";
import { Todo } from "./types";
import LiePop from "./LiePop";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoLie, setNewTodoLie] = useState(false);
  const [newTodoMemo, setNewTodoMemo] = useState("");
  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  // App コンポーネントの初回実行時のみLocalStorageからTodoデータを復元
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  // const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };
  const updateLie = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoLie(e.target.checked);
  };
  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (!todo.lie) {
          return { ...todo, isDone: value };
        } else {
          setPopUpVisible(!isPopUpVisible);
          return todo;
        }
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };
  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName === "" ? "未設定のタスク" : newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      lie: newTodoLie,
      memo: newTodoMemo,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setNewTodoLie(false);
    setNewTodoMemo("");
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div>
        <LiePop
          isPopUpVisible={isPopUpVisible}
          setPopUpVisible={setPopUpVisible}
        />
      </div>
      <div className="mb-4">
        <WelcomeMessage name="寝屋川タヌキ" />
      </div>
      <TodoList
        todos={todos}
        updateIsDone={updateIsDone}
        remove={remove}
        setTodos={setTodos}
      />
      <button
        type="button"
        onClick={removeCompletedTodos}
        className={
          "mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
        }
      >
        完了済みのタスクを削除
      </button>
      <div className="mt-5 space-y-2 rounded-md border p-3">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoName">
              名前
            </label>
            <input
              id="newTodoName"
              type="text"
              value={newTodoName}
              onChange={updateNewTodoName}
              className={"grow rounded-md border p-2"}
              placeholder="課題の名前を書け"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="font-bold">優先度</div>
          {[1, 2, 3].map((value) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                id={`priority-${value}`}
                name="priorityGroup"
                type="radio"
                value={value}
                checked={newTodoPriority === value}
                onChange={updateNewTodoPriority}
              />
              <span>{value}</span>
            </label>
          ))}
          <div className="flex gap-5">
            <label htmlFor="lie" className="font-bold">
              嘘
            </label>
            <input
              id="lie"
              type="checkbox"
              checked={newTodoLie}
              onChange={updateLie}
              className="mr-1.5 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <label htmlFor="deadline" className="font-bold">
            期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                : ""
            }
            onChange={updateDeadline}
            className="rounded-md border border-gray-400 px-2 py-0.5"
          />
        </div>
        <div className="gap-x-2">
          <label htmlFor="memo" className="font-bold">
            メモ
          </label>
          <textarea
            id="memo"
            value={newTodoMemo}
            onChange={(e) => setNewTodoMemo(e.target.value)}
            className="w-full rounded-md border border-gray-400 px-2 py-0.5"
            rows={3}
          ></textarea>
        </div>

        <button
          type="button"
          onClick={addNewTodo}
          className={
            "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
          }
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default App;
