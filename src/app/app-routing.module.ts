import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./todos/todos.module').then((m) => m.TodosModule),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./todo-create/todo-create.module').then(
        (m) => m.TodoCreateModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
