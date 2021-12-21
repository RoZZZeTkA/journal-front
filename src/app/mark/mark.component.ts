import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Clazz } from '../clazz';
import { ClazzService } from '../clazz.service';
import { LoginService } from '../login.service';
import { MarkService } from '../mark.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {

  public students: User[];
  // public classes: Clazz[];
  public subjects: Subject[];

  constructor(private markService: MarkService,
              private userService: UserService,
              private classService: ClazzService,
              private subjectService: SubjectService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.getStudents();
    this.getSubjects();
    // let studentSelect = document.getElementById('studentSelect');
    // studentSelect.addEventListener('change', () => this.getClasses(
    //   (<HTMLInputElement>document.getElementById('studentSelect')).value));
  }

  public getStudents(): void {
    this.userService.getStudents(this.loginService.getHeaders()).subscribe(
      (response: User[]) => {
        this.students = response;
        // this.getClasses(this.students[0].firstName + "\u00A0" + this.students[0].secondName)
      }
    )
  }

  public getSubjects(): void {
    this.subjectService.getSubjects(this.loginService.getHeaders()).subscribe(
      (response: Subject[]) => {
        this.subjects = response;
      }
    )
  }

  // public getClasses(studentName: string): void {
  //   this.students.forEach(
  //     (student) => {
  //       if (student.firstName + "\u00A0" + student.secondName == studentName){
  //         this.classService.getSchedule(this.loginService.getHeaders(), student.id).subscribe(
  //           (response: Clazz[]) => {
  //             this.classes = response;
  //             console.log(response);
  //           }
  //         )
  //       }
  //     }
  //   )
  // }

  public addMark(addMarkForm: NgForm): void {
    let subjectName = (<HTMLInputElement>document.getElementById('subjectSelect')).value;
    this.subjects.forEach(
      (subject) => {
        if (subject.name == subjectName) {
          addMarkForm.controls['subjectId'].setValue(subject.id);
        }
      }
    )
    let studentName = (<HTMLInputElement>document.getElementById('studentSelect')).value;
    this.students.forEach(
      (student) => {
        if (student.firstName + '\u00A0' + student.secondName == studentName) {
          addMarkForm.controls['studentId'].setValue(student.id);
        }
      }
    )
    this.markService.addMark(this.loginService.getHeaders(), addMarkForm.value).subscribe();
  }
}
