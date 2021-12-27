import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '../subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { LoginService } from '../login.service';
import { SubjectService } from '../subject.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Clazz } from '../clazz';
import { ClazzService } from '../clazz.service';
import { ClazzView } from '../clazzView';
import { ClassroomService } from '../classroom.service';
import { Classroom } from '../classroom';
import { MarkService } from '../mark.service';
import { Mark } from '../mark';
import { MarkView } from '../markView';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public id: number;
  private subscription: Subscription;
  public user: User;
  public groupName: string;
  public groups: Group[];
  public subjects: Subject[];
  public userSubjects: Subject[];
  public teachers: User[];
  public classrooms: Classroom[];
  public marks: MarkView[] = [];
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
              private classroomService: ClassroomService,
              private markService: MarkService) { 
    this.subscription = activateRoute.params.subscribe(data => this.id = data['id']);
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.userService.getUserById(this.id, this.loginService.getHeaders()).subscribe(
      (resonse: User) => {
        this.user = resonse;
        this.groupService.getGroups(this.loginService.getHeaders()).subscribe(
          (response: Group[]) => {
            this.groups = response;
            this.groups.forEach(
              (group) => {
                if (group.id == this.user.groupId) {
                  this.groupName = group.name;
                }
              }
            )
            this.subjectService.getSubjectsByUserToAdd(this.loginService.getHeaders(), this.id).subscribe(
              (response: Subject[]) => {
                this.subjects = response;
                this.subjectService.getSubjectsByUser(this.loginService.getHeaders(), this.id).subscribe(
                  (response: Subject[]) => {
                    this.userSubjects = response;
                    this.userService.getUsers(this.loginService.getHeaders()).subscribe(
                      (response) => {
                        this.teachers = response;
                        this.classroomService.getClassrooms(this.loginService.getHeaders()).subscribe(
                          (response) => {
                            this.classrooms = response;
                            this.getSchedule();
                            this.getMarks();
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
        if (this.user.role == "STUDENT") {
          (<HTMLInputElement>document.getElementById('subjects')).style.display = 'none';
        }
        if (this.user.role == "TEACHER" || this.user.role == "ADMIN") {
          (<HTMLInputElement>document.getElementById('group')).style.display = 'none';
          (<HTMLInputElement>document.getElementById('marks')).style.display = 'none';
        }
      }
    );
  }

  public getSchedule(): void {
    this.clazzService.getSchedule(this.loginService.getHeaders(), this.id).subscribe(
      (response: Clazz[]) => {
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
            this.userSubjects.forEach(
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
            this.teachers.forEach(
              (teacher) => {
                if (teacher.id == clazz.teacherId) {
                  clazzView.teacherName = teacher.firstName + " " + teacher.secondName;
                }
              }
            )
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
    );
  }

  public getMarks(): void {
    this.markService.getMarksByStudent(this.loginService.getHeaders(), this.id).subscribe(
      (response) => {
        console.log(response)
        response.forEach(
          (mark) => {
            console.log(mark)
            let markView: MarkView = {
              id: 0,
              subjectName: '',
              studentId: 0,
              value: 0,
              markDate: ''
            }
            this.subjects.forEach(
              (subject) => {
                if (subject.id == mark.subjectId) {
                  markView.subjectName = subject.name;
                }
              }
            )
            this.userSubjects.forEach(
              (subject) => {
                if (subject.id == mark.subjectId) {
                  markView.subjectName = subject.name;
                }
              }
            )
            markView.value = mark.value;
            markView.markDate = mark.markDate.substring(0, 10);
            console.log(markView)
            this.marks.push(markView);
          }
        )
        console.log(this.marks)
      }
    )
  }

  public setGroup(setGroupForm: NgForm): void {
    setGroupForm.controls['id'].setValue(this.id);
    let groupName = (<HTMLInputElement>document.getElementById('groupSelect')).value;
    this.groups.forEach(
      (group) => {
        if (group.name == groupName) {
          setGroupForm.controls['groupId'].setValue(group.id);
        }
      }
    )
    this.userService.setGroup(this.loginService.getHeaders(), setGroupForm.value).subscribe();
  }

  public addSubjectToUser(addSubjectForm: NgForm): void {
    let subjectName = (<HTMLInputElement>document.getElementById('subjectSelect')).value;
    this.subjects.forEach(
      (subject) => {
        if (subject.name == subjectName) {
          addSubjectForm.controls['id'].setValue(subject.id);
        }
      }
    )
    this.userService.addSubjectToUser(this.loginService.getHeaders(), addSubjectForm.value, this.id).subscribe();
  }
}
