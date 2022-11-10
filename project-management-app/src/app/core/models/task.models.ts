export interface Task {
  title: string;
  order: number;
  description: string;
  userId: number;
  users: Array<string>;
}

export interface PartialTaskWithOrder {
  _id: string;
  order: number;
  columnId: string;
}
