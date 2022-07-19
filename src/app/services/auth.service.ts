import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import cryptoRandomString from 'crypto-random-string';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from './message.service';

export interface IAuthModel {
  success: boolean
  accessToken: string
  user: User
  role: number
}

export interface ILoginData {
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: IAuthModel = {
    success: false,
    accessToken: '',
    user: new User(),
    role: 1
  }

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  access_token$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
  ) {
    const loginInfo = sessionStorage.getItem('login');
    if (loginInfo) {
      const loginObject = JSON.parse(loginInfo);
      this.access_token$.next(loginObject.accessToken);
      this.user$.next(loginObject.user);
    }

    this.user$.subscribe({
      next: user => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/', 'login']);
          this.access_token$.next('');
          sessionStorage.removeItem('login');
        }
      }
    })
  }

  login(loginData: ILoginData): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        users.map(item => {
          if (item.email==loginData.email && item.password==loginData.password){
            this.authData.success = true;
            this.authData.accessToken = cryptoRandomString({length: 20});
            this.authData.user = item;
            this.authData.user.password = "";
            this.authData.role= item.role;

            sessionStorage.setItem('login', JSON.stringify(this.authData));
            this.user$.next(item);
            this.access_token$.next(cryptoRandomString({length: 20}));
          }
        })
        if ( this.authData.success==false) {
          this.messageService.openSnackBar( 3000, "Hibás email vagy jelszó" );
        }
      }
    })
  }

  logout(): void{
    this.user$.next(null);
  }
}
