// NewTodoForm.tsx
import React from "react";
import dayjs from "dayjs";

interface NewTodoFormProps {
  newTodoName: string;
  newTodoPriority: number;
  newTodoDeadline: Date | null;
  newTodoLie: boolean;
  newTodoMemo: string;
  updateNewTodoName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateNewTodoPriority: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateDeadline: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateLie: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setNewTodoMemo: (value: string) => void;
  addNewTodo: () => void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  newTodoName,
  newTodoPriority,
  newTodoDeadline,
  newTodoLie,
  newTodoMemo,
  updateNewTodoName,
  updateNewTodoPriority,
  updateDeadline,
  updateLie,
  setNewTodoMemo,
  addNewTodo,
}) => {
  return (
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
          rows={4}
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
  );
};

export default NewTodoForm;
