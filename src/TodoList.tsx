import React from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem"; // ◀◀ 追加
import dayjs from "dayjs";
import EditPop from "./EditPop";
type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
  setLiePopupState: (value: number) => void;
  EditPopUpId: string;
  setEditPopUpId: (value: string) => void;
};

const TodoList = (props: Props) => {
  const todos = props.todos;
  const displayEditPopUp = (id: string) => {
    if (id) {
      return (
        <EditPop
          todos={todos}
          setEditingPopUpId={props.setEditPopUpId}
          EditingPopUpId={id}
          setTodos={props.setTodos}
        />
      );
    }
  };
  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map(
        (todo) =>
          !(todo.lie && dayjs(todo.deadline).isBefore(dayjs())) && (
            <TodoItem
              key={todo.id}
              todo={todo}
              remove={props.remove}
              updateIsDone={props.updateIsDone}
              setTodos={props.setTodos}
              setLiepopupState={props.setLiePopupState}
              EditPopUpId={props.EditPopUpId}
              setEditPopUpId={props.setEditPopUpId}
            />
          )
      )}
      {displayEditPopUp(props.EditPopUpId)}
    </div>
  );
};

export default TodoList;
