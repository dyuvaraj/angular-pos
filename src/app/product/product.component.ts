import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css','../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css']
})
export class ProductComponent implements OnInit {
  
  productData:any = []; 

  constructor(private _auth: AuthService, private _router: Router, private toastr: ToastrService) { }

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
        this.toastr.success("Product Updated Successfully", "Update");
      },
        err => {console.log(err.error)
        this.toastr.error("Some fields are missing", "Error");
      },
    );
  }

}
