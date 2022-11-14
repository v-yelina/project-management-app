import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskComponent } from './components/task/task.component';
import { ColumnComponent } from './components/column/column.component';
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './pages/board/board.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';

const routes: Routes = [
  { path: 'board', component: BoardComponent },
  { path: ':id', component: BoardComponent },
];

@NgModule({
  declarations: [
    TaskComponent,
    EditTaskComponent,
    ColumnComponent,
    BoardComponent,
    CreateColumnComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [BoardComponent],
})
export class BoardModule {}
