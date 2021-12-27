import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public login(loginForm: NgForm): void {
    this.loginService.login(loginForm.value).subscribe(
      (response) => {
        localStorage.setItem("token", "Bearer " + response.accessToken);
        this.router.navigate([`/schedule`]);
      }
    );
  }
}
