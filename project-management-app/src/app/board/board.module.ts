import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskComponent } from './components/task/task.component';
import { ColumnComponent } from './components/column/column.component';
import { SharedModule } from '../shared/shared.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardComponent } from './components/board/board.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';

const routes: Routes = [
  { path: '', component: BoardsPageComponent },
  { path: ':id', component: BoardPageComponent },
];

@NgModule({
  declarations: [
    TaskComponent,
    EditTaskComponent,
    ColumnComponent,
    BoardsPageComponent,
    BoardComponent,
    BoardPageComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatMenuModule,
  ],
  exports: [TaskComponent, ColumnComponent],
})
export class BoardModule {}
