import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[];

  constructor(private userService: UserService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers(this.loginService.getHeaders()).subscribe(
      (response: User[]) => {
        this.users = response;
      }
    );
  }

  public addUser(addUserForm: NgForm): void {
    this.userService.addUser(this.loginService.getHeaders(), addUserForm.value).subscribe();
  }
}
