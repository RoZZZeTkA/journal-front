import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clazz } from '../clazz';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { LoginService } from '../login.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public groups: Group[];
  public teachers: User[];
  public frontServerUrl = environment.frontUrl;

  constructor(private groupService: GroupService,
              private userService: UserService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.getGroups();
    this.getTeachers();
  }

  public getGroups(): void {
    this.groupService.getGroups(this.loginService.getHeaders()).subscribe(
      (response: Group[]) => {
        this.groups = response;
      }
    )
  }

  public getTeachers(): void {
    this.userService.getTeachers(this.loginService.getHeaders()).subscribe(
      (response: User[]) => {
        this.teachers = response;
      }
    )
  }

}
