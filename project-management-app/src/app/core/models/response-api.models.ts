export interface UserResponse {
  _id: string;
  name: string;
  login: string;
}

export interface BoardResponse {
  _id: string;
  title: string;
  owner: string;
  users: Array<string>;
}
