import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/pd/demo/demo.css', '../assets/pd/css/paper-dashboard.css',]
})
export class AppComponent {
  title = 'angular-pos';
  PageTilte: any = "Dashboard";

  
  constructor(private _auth: AuthService, private _router: Router) { }

  isLoggedIn = this._auth.isLoggedIn;

  logoutUser(){
    this._auth.isLoggedIn = false;
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }
}




