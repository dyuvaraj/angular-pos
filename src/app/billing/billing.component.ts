import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css','../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css']
})
export class BillingComponent implements OnInit {

  productData:any = []; 
  SaleList:any = [];
  TotalAmount:any = 0;
  customer_name:any;

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this._auth.billing().products.subscribe(
      response => {
        this.productData = response.product;
        console.log(this.productData);
      }
    );
  }

  UpdateJson(id:any, event:any){

    let SaleListNew = {"products": id, "quantity": "1"};

    if(event.target.checked == false){
        var index = this.SaleList.findIndex((e: any) => e.products === id)
        this.SaleList.splice(index,1);      
    }
    else if(event.target.checked == true){
      this.SaleList.push(SaleListNew);
    }

  }

  AddRemoveToBill(product:any, AddRemove:any){

    // let TotalAmount = 0;    
    let SaleListNew = { "product_id": product.id, 
                        "product": product.product_name, 
                        "quantity": 1, 
                        "price": product.product_sell_price,
                        "amt": product.product_sell_price };

    var index = this.SaleList.findIndex((e: any) => e.product_id == product.id);

    if(AddRemove == "add"){      
      if(index==-1){
        this.SaleList.push(SaleListNew);
      }
      else{
        this.SaleList[index].quantity++;
        let Qty = this.SaleList[index].quantity;
        this.SaleList[index].amt = Qty*product.product_sell_price;
      }
    }

    if(AddRemove == "remove"){
      if(index != -1){
        if(this.SaleList[index].quantity == 1){
          this.SaleList.splice(index,1);
        }
        else{
          this.SaleList[index].quantity--;
          let Qty = this.SaleList[index].quantity;
          this.SaleList[index].amt = Qty*product.product_sell_price;
        }
      }
      else{
        // alert("add item to list");
      }
    }
    this.TotalAmount = 0
    this.SaleList.forEach((element: any) => this.TotalAmount = this.TotalAmount+element.amt);
    // console.log(this.SaleList);

  }

  saveBill(){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var dates = mm + '/' + dd + '/' + yyyy;

    const BillingForm = new FormGroup({
      order_date: new FormControl(dates),
      customer_name: new FormControl(this.customer_name),
      products: new FormControl(JSON.stringify(this.SaleList)),
      total: new FormControl(this.TotalAmount)
    });

    this._auth.billSave((BillingForm.value))
    .subscribe(
      res => {console.log(res)
      },
      err => {console.log(err)       
      },
    );
    
  }


}
