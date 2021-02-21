import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css','../../assets/pd/demo/demo.css', '../../assets/pd/css/paper-dashboard.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

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
      },
      err => {
        this.errorData.push(err.error)  
        console.log(this.errorData[0]) ;
      },
    );
  }

}
