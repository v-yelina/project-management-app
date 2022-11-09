import { Component } from '@angular/core';
import { TaskResponse } from 'src/app/core/models/response-api.models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  taskData: Pick<TaskResponse, 'description' | 'title'> = {
    title: 'New Task Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
  };
}
