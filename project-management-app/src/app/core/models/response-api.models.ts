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

export interface ColumnResponse {
  _id: string,
  title: string,
  order: number,
  boardId: string
}

export interface BoardResponse {
  _id: string,
  title: string,
  owner: string,
  users: string[],
}
