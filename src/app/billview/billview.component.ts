import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billview',
  templateUrl: './billview.component.html',
  styleUrls: ['./billview.component.css','../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css']
})
export class BillviewComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  salesData:any = [];
  ViewOrder:any;

  ngOnInit(): void {
    this._auth.billView().salesOrders.subscribe(
      response => {
        this.salesData = response.salesOrder;
        console.log(this.salesData);
      }
    );
  }

  ShowOrder(id:any){
    this.ViewOrder = id;
  }
  

}
