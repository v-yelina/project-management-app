export interface UserResponse {
  _id: string;
  name: string;
  login: string;
}

export interface TaskResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}
