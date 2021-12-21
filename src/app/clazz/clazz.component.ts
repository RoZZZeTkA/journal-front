import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Classroom } from '../classroom';
import { ClassroomService } from '../classroom.service';
import { ClazzService } from '../clazz.service';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { LoginService } from '../login.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-clazz',
  templateUrl: './clazz.component.html',
  styleUrls: ['./clazz.component.css']
})
export class ClazzComponent implements OnInit {

  public subjects: Subject[];
  public groups: Group[];
  public teachers: User[];
  public classrooms: Classroom[];
  public startHours: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  public endHours: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  public startMinutes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
  public endMinutes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

  constructor(private classService: ClazzService,
              private loginService: LoginService,
              private subjectService: SubjectService,
              private groupService: GroupService,
              private userService: UserService,
              private classroomService: ClassroomService) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getGroups();
    this.getClassrooms();
    let subjectSelect = document.getElementById('subjectSelect');
    subjectSelect.addEventListener('change', () => this.getTeachersBySubject(
      (<HTMLInputElement>document.getElementById('subjectSelect')).value));
    let startTimeHourSelect = document.getElementById('startTimeHourSelect');
    startTimeHourSelect.addEventListener('change', () => this.checkTime());
    let startTimeMinuteSelect = document.getElementById('startTimeMinuteSelect');
    startTimeMinuteSelect.addEventListener('change', () => this.checkTime());
    let endTimeHourSelect = document.getElementById('endTimeHourSelect');
    endTimeHourSelect.addEventListener('change', () => this.checkTime());
  }

  public checkTime() {
    let startHour = (<HTMLInputElement>document.getElementById('startTimeHourSelect')).value;
    let startMinute = (<HTMLInputElement>document.getElementById('startTimeMinuteSelect')).value;
    let endHour = (<HTMLInputElement>document.getElementById('endTimeHourSelect')).value;
    this.endHours = this.startHours.slice(Number(startHour) - 8, 13);
    if (startHour == endHour) {
      this.endMinutes = this.startMinutes.slice(Number(startMinute) + 1, 60);
    } else {
      this.endMinutes = this.startMinutes;
    }
  }

  public getSubjects(): void {
    this.subjectService.getSubjects(this.loginService.getHeaders()).subscribe(
      (response: Subject[]) => {
        this.subjects = response;
        this.getTeachersBySubject(this.subjects[0].name);
      }
    )
  }

  public getGroups(): void {
    this.groupService.getGroups(this.loginService.getHeaders()).subscribe(
      (response: Group[]) => {
        this.groups = response;
      }
    )
  }

  public getTeachersBySubject(subjectName: string): void {
    this.userService.getUserBySubject(this.loginService.getHeaders(), subjectName).subscribe(
      (response: User[]) => {
        this.teachers = response;
      }
    )
  }

  public getClassrooms(): void {
    this.classroomService.getClassrooms(this.loginService.getHeaders()).subscribe(
      (response: Classroom[]) => {
        this.classrooms = response;
      }
    )
  }

  public addClass(addClassForm: NgForm):void {
    let subjectName = (<HTMLInputElement>document.getElementById('subjectSelect')).value;
    this.subjects.forEach(
      (subject) => {
        if (subject.name == subjectName) {
          addClassForm.controls['subjectId'].setValue(subject.id);
        }
      }
    )
    let groupName = (<HTMLInputElement>document.getElementById('groupSelect')).value;
    this.groups.forEach(
      (group) => {
        if (group.name == groupName) {
          addClassForm.controls['groupId'].setValue(group.id);
        }
      }
    )
    let teacherName = (<HTMLInputElement>document.getElementById('teacherSelect')).value;
    this.teachers.forEach(
      (teacher) => {
        if (teacher.firstName + '\u00A0' + teacher.secondName == teacherName) {
          addClassForm.controls['teacherId'].setValue(teacher.id);
        }
      }
    )
    let classroomName = (<HTMLInputElement>document.getElementById('classroomSelect')).value;
    this.classrooms.forEach(
      (classroom) => {
        if (classroom.name == classroomName) {
          addClassForm.controls['classroomId'].setValue(classroom.id);
        }
      }
    )
    switch ((<HTMLInputElement>document.getElementById('daySelect')).value) {
      case 'Monday':
        addClassForm.controls['dayNumber'].setValue(1);
        break;
      case 'Tuesday':
        addClassForm.controls['dayNumber'].setValue(2);
        break;
      case 'Wednesday':
        addClassForm.controls['dayNumber'].setValue(3);
        break;
      case 'Thursday':
        addClassForm.controls['dayNumber'].setValue(4);
        break;
      case 'Friday':
        addClassForm.controls['dayNumber'].setValue(5);
        break;
    }
    addClassForm.controls['startTimeHour'].setValue((<HTMLInputElement>document.getElementById('startTimeHourSelect')).value);
    addClassForm.controls['startTimeMinute'].setValue((<HTMLInputElement>document.getElementById('startTimeMinuteSelect')).value);
    addClassForm.controls['endTimeHour'].setValue((<HTMLInputElement>document.getElementById('endTimeHourSelect')).value);
    addClassForm.controls['endTimeMinute'].setValue((<HTMLInputElement>document.getElementById('endTimeMinuteSelect')).value);
    this.classService.addClass(this.loginService.getHeaders(), addClassForm.value).subscribe();
  }

}
