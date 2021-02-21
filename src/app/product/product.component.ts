import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css','../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css']
})
export class ProductComponent implements OnInit {
  
  productData:any = []; 

  constructor(private _auth: AuthService, private _router: Router) { }

  // @ViewChild('Pencil')
  // myInput!: ElementRef;
  // @ViewChild('Pencil') input!: ElementRef<HTMLInputElement>;

  productEditData:any = {};

  ngOnInit(): void {
    this._auth.productShowall().subscribe(
      response => {
        this.productData = response.product;
        console.log(this.productData);
      }
    );
  }

  refreshProductData(){
    this._auth.productShowall().subscribe(
      response => {
        this.productData = response.product;
        console.log(this.productData);
      }
    );
  }

  updateproductEditData(product:any){
    this.productEditData = product;
  }

  productEdit(productID: any){
    this._auth.productEdit(this.productEditData, productID)
    .subscribe(
        res => {console.log(res)
      },
        err => {console.log(err.error)       
      },
    );
  }

}
