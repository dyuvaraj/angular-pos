import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/style.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ActivationLink: any;

  loginUserData:any = {};
  ngOnInit(): void {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {console.log(res.access_token)
        localStorage.setItem('token', res.access_token)
        this._router.navigate(['/dashboard']);        
      },
      err => {console.log(err.error)
        if(err.error.verify_link){
          this.ActivationLink = err.error.verify_link
        }              
      },
    );
  }

}
