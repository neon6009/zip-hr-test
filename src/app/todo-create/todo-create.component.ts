import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { TodoPriority } from '../shared/enums/todo-priority';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: 'todo-create.component.html',
  styleUrls: ['todo-create.component.scss'],
})
export class TodoCreateComponent implements OnInit {
  form: FormGroup;
  model: NgbDateStruct | null;
  todoPriority = TodoPriority;

  constructor(
    private appService: AppService,
    private calendar: NgbCalendar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.appService.getTodoForm();
  }

  selectToday(): void {
    this.model = this.calendar.getToday();
  }

  clear(): void {
    this.model = null;
  }

  saveTodo(): void {
    const ngbDate = `${this.form.value.date.day} ${this.form.value.date.month} ${this.form.value.date.year}`;
    const msDate = moment(ngbDate, 'D M YYYY').valueOf();
    this.appService.saveTodo({
      title: this.form.value.title,
      done: false,
      date: msDate,
      priority: this.form.value.priority,
    });
    this._router.navigateByUrl('');
  }
}
