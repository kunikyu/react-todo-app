import { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート
import dayjs from "dayjs";

export const initTodos: Todo[] = [
  //期限まで2日以上あるタスク
  {
    id: uuid(),
    name: "Todo1",
    isDone: false,
    priority: 1,
    deadline: new Date(dayjs().add(2, "day").toDate()), // 2日後の日付をセット
    lie: false,
    memo: "期限まで残り2日以上あるタスクは青色になります。",
  },
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "Todo2",
    isDone: false,
    priority: 2,
    deadline: new Date(dayjs().add(1, "day").toDate()), // 1日後の日付をセット
    lie: false,
    memo: "期限まで残り1日をきっているのタスクは黄色になります。",
  },
  {
    id: uuid(),
    name: "Todo3",
    isDone: false,
    priority: 3,
    deadline: new Date(dayjs().subtract(1, "day").toDate()), // 1日前の日付をセット
    lie: false,
    memo: "期限を過ぎてしまっているタスクは赤色になります。",
  },
  {
    id: uuid(),
    name: "Todo4",
    isDone: false,
    priority: 1,
    deadline: null, // 期限なし
    lie: false,
    memo: "期限がないタスクは黒色になります。",
  },
  {
    id: uuid(),
    name: "Todo5",
    isDone: true,
    priority: 2,
    deadline: new Date(dayjs().add(3, "day").toDate()), // 3日後の日付をセット
    lie: false,
    memo: "完了したタスクは取り消し線が引かれます。",
  },
];
