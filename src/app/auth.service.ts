import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiURL = "http://127.0.0.1:8000/api/auth/";

  private _login = this._apiURL+"login";
  private _register = this._apiURL+"register";
  private _productshowall = this._apiURL+"product-showall";
  private _productAdd = this._apiURL+"product-add";
  private _productEdit = this._apiURL+"product-edit";
  private _saveBill = this._apiURL+"salesorder-add";
  private _salesOrderShowAll = this._apiURL+"salesorder-showall";
  private _salesOrderShow = this._apiURL+"salesorder-show";
  private _salesOrderUpdate = this._apiURL+"salesorder-edit";
  private _productgetById = this._apiURL+"productById";
  private _getCustomer = this._apiURL+"customers";
  private _reportBWDates = this._apiURL+"salesorder-bwd";
  private _reportByCustomer = this._apiURL+"salesorder-cus";
  private _reportOverall = this._apiURL+"overallreport";

  isLoggedIn = true;
  

  constructor(private http: HttpClient, private _router: Router) { }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  loginUser(user: any){
    this.isLoggedIn = true;
    return this.http.post<any>(this._login, user);
  }

  registerUser(user: any){
    return this.http.post<any>(this._register, user);
  }

  productShowall(){
    return this.http.get<any>(this._productshowall);
  }

  productGetById(productID:any){
    return this.http.get<any>(this._productgetById+"/"+productID);
  }

  productAdd(product: any){
    return this.http.post<any>(this._productAdd, product);
  }

  productEdit(product: any, productID:any){
    return this.http.post<any>(this._productEdit+"/"+productID, product);
  }

  billing(){
    const products = this.http.get<any>(this._productshowall);
    const customer: any = 0;

    let ReturnJSON = {"products": products, "customer": customer};

    return ReturnJSON;
  }

  billEdit(){
    const products = this.http.get<any>(this._productshowall);
    const salesOrders = this.http.get<any>(this._salesOrderShowAll);

    let ReturnJSON = {"products": products, "salesOrders": salesOrders};

    return ReturnJSON;
  }

  billView(){
    const products = this.http.get<any>(this._productshowall);
    const salesOrders = this.http.get<any>(this._salesOrderShowAll);

    let ReturnJSON = {"products": products, "salesOrders": salesOrders};

    return ReturnJSON;
  }

  showSales(id:any){
    const products = this.http.get<any>(this._productshowall);
    const salesOrders = this.http.get<any>(this._salesOrderShow+"/"+id);

    let ReturnJSON = {"products": products, "salesOrders": salesOrders};

    return ReturnJSON;
  }


  billSave(billData: any){
    return this.http.post<any>(this._saveBill+"/", billData);
  }

  billUpdate(billData: any, id: any){
    return this.http.post<any>(this._salesOrderUpdate+"/"+id, billData);
  }

  getCustomers(){
    const customers =  this.http.get<any>(this._getCustomer);
    const salesOrders = this.http.get<any>(this._salesOrderShowAll);

    let ReturnJSON = {"customers": customers, "salesOrders":salesOrders};

    return ReturnJSON;
  }

  reportByDates(fromDate: any, toDate: any){
    return this.http.get<any>(this._reportBWDates+"/"+fromDate+"/"+toDate);
  }

  reportByCustomer(customer: any){
    return this.http.get<any>(this._reportByCustomer+"/"+customer);
  }
  
  reportDashboard(){
    return this.http.get<any>(this._reportOverall);
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
