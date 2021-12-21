import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public subjects: Subject[];

  constructor(private subjectService: SubjectService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  public getSubjects(): void {
    this.subjectService.getSubjects(this.loginService.getHeaders()).subscribe(
      (response: Subject[]) => {
        this.subjects = response;
      }
    )
  }

  public addSubject(addSubjectForm: NgForm): void {
    this.subjectService.addSubject(this.loginService.getHeaders(), addSubjectForm.value).subscribe();
  }
}
