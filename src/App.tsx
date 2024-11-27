import { useState, useEffect } from "react";
import { Todo } from "./types";
import LiePop from "./LiePop";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import NewTodoForm from "./NewTodoForm";
import dayjs from "dayjs";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoLie, setNewTodoLie] = useState(false);
  const [newTodoMemo, setNewTodoMemo] = useState("");
  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";
  const [LiePopupState, setLiePopupState] = useState(0);
  const [NewTodoPopupState, setNewTodoPopupState] = useState(false);
  // App コンポーネントの初回実行時のみLocalStorageからTodoデータを復元
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      console.log(convertedTodos);
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
      const filteredTodos = todos.filter((todo) => {
        return !(todo.lie && dayjs(todo.deadline).isBefore(dayjs()));
      });
      localStorage.setItem(localStorageKey, JSON.stringify(filteredTodos));
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
          setLiePopupState(1);
          return todo;
        }
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };
  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => !(todo.id === id && !todo.lie));
    if (todos.length === updatedTodos.length) {
      setLiePopupState(2);
    }
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
    setNewTodoPopupState(false);
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">TodoApp by kunikyu</h1>
      <div>
        <LiePop
          isPopUpVisible={LiePopupState}
          setPopUpVisible={setLiePopupState}
        />
      </div>
      <div className="mb-4">
        <WelcomeMessage name="嘘つき" />
      </div>
      <NewTodoForm
        NewTodoPopupVisible={NewTodoPopupState}
        newTodoName={newTodoName}
        newTodoPriority={newTodoPriority}
        newTodoDeadline={newTodoDeadline}
        newTodoLie={newTodoLie}
        newTodoMemo={newTodoMemo}
        updateNewTodoName={updateNewTodoName}
        updateNewTodoPriority={updateNewTodoPriority}
        updateDeadline={updateDeadline}
        updateLie={updateLie}
        setNewTodoMemo={setNewTodoMemo}
        addNewTodo={addNewTodo}
        setNewTodoPopupVisible={setNewTodoPopupState}
      />
      <button
        type="button"
        onClick={() => setNewTodoPopupState(true)}
        className="my-5 mr-3 rounded-md bg-green-500 px-3 py-1 font-bold text-white hover:bg-green-600"
      >
        新しいタスクの追加
      </button>
      <button
        type="button"
        onClick={removeCompletedTodos}
        className={
          "my-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
        }
      >
        完了済みのタスクを削除
      </button>
      <TodoList
        todos={todos}
        updateIsDone={updateIsDone}
        remove={remove}
        setTodos={setTodos}
        setLiePopupState={setLiePopupState}
      />
    </div>
  );
};

export default App;