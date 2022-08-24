import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoCreateRoutingModule } from './todo-create-routing.module';
import { TodoCreateComponent } from './todo-create.component';

@NgModule({
  declarations: [TodoCreateComponent],
  imports: [
    CommonModule,
    TodoCreateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [],
})
export class TodoCreateModule { }
