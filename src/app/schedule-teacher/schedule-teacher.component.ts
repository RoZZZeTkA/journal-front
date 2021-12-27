import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Classroom } from '../classroom';
import { ClassroomService } from '../classroom.service';
import { Clazz } from '../clazz';
import { ClazzService } from '../clazz.service';
import { ClazzView } from '../clazzView';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { LoginService } from '../login.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule-teacher',
  templateUrl: './schedule-teacher.component.html',
  styleUrls: ['./schedule-teacher.component.css']
})
export class ScheduleTeacherComponent implements OnInit {

  public id: number;
  private subscription: Subscription;
  private groups: Group[];
  private subjects: Subject[];
  private teacher: User;
  private classrooms: Classroom[];
  public monday: ClazzView[] = [];
  public tuesday: ClazzView[] = [];
  public wednesday: ClazzView[] = [];
  public thursday: ClazzView[] = [];
  public friday: ClazzView[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private userService: UserService,
              private loginService: LoginService,
              private groupService: GroupService,
              private clazzService: ClazzService,
              private subjectService: SubjectService,
              private classroomService: ClassroomService) {
    this.subscription = activateRoute.params.subscribe(data => this.id = data['id']);
  }

  ngOnInit(): void {
    this.getGroups();
  }

  public getGroups(): void {
    this.groupService.getGroups(this.loginService.getHeaders()).subscribe(
      (response: Group[]) => {
        this.groups = response;
        this.subjectService.getSubjects(this.loginService.getHeaders()).subscribe(
          (response: Subject[]) => {
            this.subjects = response;
            this.userService.getUserById(this.id, this.loginService.getHeaders()).subscribe(
              (response: User) => {
                this.teacher = response;
                this.classroomService.getClassrooms(this.loginService.getHeaders()).subscribe(
                  (response: Classroom[]) => {
                    this.classrooms = response;
                    this.clazzService.getSchedule(this.loginService.getHeaders(), this.id).subscribe(
                      (response: Clazz[]) => {
                        console.log(response);
                        response.forEach(
                          (clazz) => {
                            let clazzView: ClazzView = {
                              id: 0,
                              subjectName: '',
                              groupName: '',
                              teacherName: '',
                              classroomName: '',
                              dayNumber: 0,
                              startTimeHour: "",
                              startTimeMinute: "",
                              endTimeHour: "",
                              endTimeMinute: ""
                            };
                            clazzView.id = clazz.id;
                            this.subjects.forEach(
                              (subject) => {
                                if (subject.id == clazz.subjectId) {
                                  clazzView.subjectName = subject.name;
                                }
                              }
                            )
                            this.groups.forEach(
                              (group) => {
                                if (group.id == clazz.groupId) {
                                  clazzView.groupName = group.name;
                                }
                              }
                            )
                            clazzView.teacherName = this.teacher.firstName + " " + this.teacher.secondName;
                            this.classrooms.forEach(
                              (classroom) => {
                                if (classroom.id == clazz.classroomId) {
                                  clazzView.classroomName = classroom.name;
                                }
                              }
                            )
                            clazzView.startTimeHour = clazz.startTimeHour.toString();
                            if (clazz.startTimeHour < 10) {
                              clazzView.startTimeHour = "0" + clazz.startTimeHour;
                            }
                            clazzView.startTimeMinute = clazz.startTimeMinute.toString();;
                            if (clazz.startTimeMinute < 10) {
                              clazzView.startTimeMinute = "0" + clazz.startTimeMinute;
                            }
                            clazzView.endTimeHour = clazz.endTimeHour.toString();
                            if (clazz.endTimeHour < 10) {
                              clazzView.endTimeHour = "0" + clazz.endTimeHour;
                            }
                            clazzView.endTimeMinute = clazz.endTimeMinute.toString();
                            if (clazz.endTimeMinute < 10) {
                              clazzView.endTimeMinute = "0" + clazz.endTimeMinute;
                            }
                            switch (clazz.dayNumber) {
                              case 1:
                                this.monday.push(clazzView);
                                break;
                              case 2:
                                this.tuesday.push(clazzView);
                                break;
                              case 3:
                                this.wednesday.push(clazzView);
                                break;
                              case 4:
                                this.thursday.push(clazzView);
                                break;
                              case 5:
                                this.friday.push(clazzView);
                                break;
                            }
                          }
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        )
      }
    )
  }
}
