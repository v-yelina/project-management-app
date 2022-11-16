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
import { BoardCardComponent } from './components/board-card/board-card.component';

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
    BoardsPageComponent,
    BoardCardComponent,
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
    RouterModule.forChild(routes),
    MatMenuModule,
  ],
  exports: [BoardComponent],
})
export class BoardModule {}
