import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  
  public groups: Group[];

  constructor(private groupService: GroupService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.getGroups();
  }

  public getGroups(): void {
    this.groupService.getGroups(this.loginService.getHeaders()).subscribe(
      (response: Group[]) => {
        this.groups = response;
      }
    )
  }

  public addGroup(addGroupForm: NgForm): void {
    this.groupService.addGroup(this.loginService.getHeaders(), addGroupForm.value).subscribe();
  }
}
