import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css','../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router, private toastr: ToastrService) { }

  @Output() onProductAdd = new EventEmitter<any>();

  productData:any = {};
  errorData:any = [];
  ngOnInit(): void {
  }

  productAdd(){
    this._auth.productAdd(this.productData)
    .subscribe(
      res => {console.log(res)
        this.onProductAdd.emit();
        this.toastr.success("Product added Successfully", "Success");

      },
      err => {
        this.errorData.push(err.error)  
        console.log(this.errorData[0]) ;
        this.toastr.error("Some fields are missing", "Error");
      },
    );
  }

}
