import { Component, OnInit } from '@angular/core';
import { Clazz } from '../clazz';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public classes: Clazz[];

  constructor() { }

  ngOnInit(): void {
  }

}
