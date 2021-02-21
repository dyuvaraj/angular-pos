import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/style.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ActivationLink: any;

  registerUserData:any = {};
  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {console.log(res)
        // localStorage.setItem('token', res.token)
        // this._router.navigate(['/product-add']);
        this.ActivationLink = res.verify_link
        
      },
      err => console.log(err),
    );
  }

}
