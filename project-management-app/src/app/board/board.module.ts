import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [TaskComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [TaskComponent],
})
export class BoardModule {}
