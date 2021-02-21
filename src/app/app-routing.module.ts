import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { BillingComponent } from './billing/billing.component';
import { BilleditComponent } from './billedit/billedit.component';
import { BillviewComponent } from './billview/billview.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [


  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billing',
    component: BillingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sales',
    component: BillviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
