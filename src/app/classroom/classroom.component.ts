import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Classroom } from '../classroom';
import { ClassroomService } from '../classroom.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  public classrooms: Classroom[];

  constructor(private classroomService: ClassroomService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.getClassrooms();
  }
            
  public getClassrooms(): void {
    this.classroomService.getClassrooms(this.loginService.getHeaders()).subscribe(
      (response: Classroom[]) => {
        this.classrooms = response;
      }
    )
  }
            
  public addClassroom(addClassroomForm: NgForm): void {
    this.classroomService.addClassroom(this.loginService.getHeaders(), addClassroomForm.value).subscribe();
  }
}
