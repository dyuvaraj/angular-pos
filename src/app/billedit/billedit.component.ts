import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-billedit',
  templateUrl: './billedit.component.html',
  styleUrls: ['./billedit.component.css','../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css']
})
export class BilleditComponent implements OnChanges {

  @Input() vieworder: any;
  constructor(private _auth: AuthService, private _router: Router) { }
  
  salesData:any = [];
  SaleList:any = [];
  ProductDetail:any = [];
  productData:any = []; 

  TotalAmount:any = 0;
  customer_name:any;
  OrderID:any;


  ngOnChanges(changes: SimpleChanges): void {

    if(this.vieworder != undefined){
      this._auth.showSales(this.vieworder).salesOrders.subscribe(
        response => {
          this.SaleList = [];
          this.salesData = response;
            this.createProductJson(response.orderlist);
            this.customer_name = response.salesorder.customer_name;
            this.OrderID = response.salesorder.id;
            // console.log(this.SaleList);
        }
      );

      this._auth.showSales(this.vieworder).products.subscribe(
        response => {
          this.productData = response.product;
          // console.log(this.SaleList);
        }
      );
    }    

  }

  createProductJson(list: any){
    if(list.length != 0){
      for(let i=0; i<=list.length-1; i++){

        let SaleListNew = { "product_id": list[i].product_id, 
                          "product": list[i].product_name, 
                          "quantity": list[i].quantity, 
                          "price": list[i].product_sell_price,
                          "amt": parseInt(list[i].product_sell_price) * parseInt(list[i].quantity) };
        this.SaleList.push(SaleListNew);

      }

      this.TotalAmount = 0
      this.SaleList.forEach((element: any) => this.TotalAmount = this.TotalAmount+element.amt);
    }
  }  

  ngOnInit(): void {
    
  }
  
  showOrder(id:any){
    alert(id);
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
    console.log(this.SaleList);

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

    this._auth.billUpdate((BillingForm.value), this.OrderID)
    .subscribe(
      res => {console.log(res)
      },
      err => {console.log(err)       
      },
    );
    
  }

  


}
