export type Todo = {
  id: string;
  name: string;
  isDone: boolean;
  priority: number;
  deadline: Date | null; // 注意
  lie: boolean;
  memo: string;
};
