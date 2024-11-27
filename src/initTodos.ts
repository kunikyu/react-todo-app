import { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート
import dayjs from "dayjs";

export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "Todo1",
    isDone: false,
    priority: 2,
    deadline: new Date(dayjs().add(1, "day").toDate()), // 1日後の日付をセット
    lie: false,
    memo: "スタンダードなタスクです。",
  },
  {
    id: uuid(),
    name: "Todo2",
    isDone: false,
    priority: 3,
    deadline: new Date(dayjs().subtract(1, "day").toDate()), // 1日前の日付をセット
    lie: false,
    memo: "期限切れのタスクです。",
  },
  {
    id: uuid(),
    name: "Todo3",
    isDone: true,
    priority: 1,
    deadline: null, // 期限なしS
    lie: false,
    memo: "完了済みのタスクです。",
  },
];
