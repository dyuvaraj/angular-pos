import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css',]
})
export class DashboardComponent implements OnInit {

  salesData:any = [];
  profitData: any = [];

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this._auth.reportDashboard().subscribe(
      response => {
        this.salesData = response.total_no_sales;
        this.profitData = response;
        console.log(this.profitData);
      }
    );
  }

}
