export enum ItemType {
  board = 'board',
  column = 'column',
  task = 'task',
  user = 'user',
}

export interface ConfirmData {
  message?: string; // custom message
  id?: string; // id of item to delete
  itemType?: ItemType;
}
