import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css','../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css']
})
export class ReportComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }
  customers: any = [];
  salesData:any = [];
  profitData: any = [];

  showData: any = false;

  options:any = false;
  type:any = true;

  fromDate:any;
  toDate:any;

  ngOnInit(): void {

    this._auth.getCustomers().customers.subscribe(
      response => {
        this.customers = response.customers;
        console.log(this.customers);
      }
    );

    this._auth.getCustomers().salesOrders.subscribe(
      response => {
        this.salesData = response.salesOrder;
        console.log(this.salesData);
      }
    );    
    
  }

  getReportByCustomer(customer: any){
    this._auth.reportByCustomer(customer.target.value).subscribe(
      response => {
        this.salesData = response.total_no_sales;
        this.profitData = response;
        this.showData = true;
        console.log(this.profitData);
      }
    );
  }

  getReportByDate(){
    this._auth.reportByDates(this.fromDate, this.toDate).subscribe(
      response => {
        this.salesData = response.total_no_sales;
        this.profitData = response;
        this.showData = true;
        console.log(this.profitData);
      }
    );
  }

}
