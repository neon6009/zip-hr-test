import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoCreateComponent } from './todo-create.component';

const routes: Routes = [
  {
    path: '',
    component: TodoCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoCreateRoutingModule { }
