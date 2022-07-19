import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$ =this.auth.user$;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }


}
