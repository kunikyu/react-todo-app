import React from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem"; // ◀◀ 追加

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
  setLiePopupState: (value: number) => void;
};

const TodoList = (props: Props) => {
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          todos={todos}
          key={todo.id}
          todo={todo}
          remove={props.remove}
          updateIsDone={props.updateIsDone}
          setTodos={props.setTodos}
          setLiepopupState={props.setLiePopupState}
        />
      ))}
    </div>
  );
};

export default TodoList;
