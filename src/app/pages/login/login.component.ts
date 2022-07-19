import { ILoginData, AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValid = true;
  hide: boolean = true;
  loginForm !: FormGroup;
  loginData : ILoginData ={ };

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.logout();
    this.loginForm = new FormGroup({
      email : new FormControl( this.loginData.email, [Validators.required, Validators.email] ),
      password : new FormControl( this.loginData.password, [Validators.required] )
    });
  }

  submitForm(): void{
  }

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  onLogin(): void {
    this.auth.login(this.loginForm.value);
  }

}
