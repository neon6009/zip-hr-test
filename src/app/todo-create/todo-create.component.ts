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
  minDate: NgbDateStruct;

  constructor(
    private appService: AppService,
    private calendar: NgbCalendar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.appService.getTodoForm();
    this.minDate = this.fromModel(moment().format('DD.MM.YYYY'), '.') as NgbDateStruct;
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

  fromModel(value: Date | String | Number, DELIMITER: string): NgbDateStruct | undefined {
    try {
      let ngbDate: NgbDateStruct = {
        year: 0,
        month: 0,
        day: 0
      };
      if (value instanceof Date) {
        ngbDate = {
          day: value.getDate(),
          month: value.getMonth(),
          year: value.getFullYear(),
        };
      } else if (value instanceof String || typeof value === 'string') {
        const dateArr = value.split(' ')[0]?.split(DELIMITER);
        ngbDate = {
          day: Number(dateArr[0]),
          month: Number(dateArr[1]),
          year: Number(dateArr[2]),
        };
      } else if (value instanceof Number || typeof value === 'number') {
        const date = new Date(value as number);
        ngbDate = {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      }
      return ngbDate;
    } catch (error) {
      console.log(
        'Error convert date to NgbDateStruct. Check input format value date!',
        error,
      );
    }
  }
}
