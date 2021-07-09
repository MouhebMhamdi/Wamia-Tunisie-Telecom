import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderierComponent } from './admin/calenderier/calenderier.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { EventsAdminComponent } from './admin/events-admin/events-admin.component';
import { PartenairesComponent } from './admin/partenaires/partenaires.component';
import { ProfileaComponent } from './admin/profilea/profilea.component';
import { UsersComponent } from './admin/users/users.component';
import { EventscComponent } from './client/eventsc/eventsc.component';
import { ProfilecComponent } from './client/profilec/profilec.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EvenementComponent } from './partenaire/evenement/evenement.component';
import { ProfilepComponent } from './partenaire/profilep/profilep.component';
import { LogoutComponent } from './logout/logout.component';
import { PaymentComponent } from './client/payment/payment.component';
import { StatComponent } from './admin/stat/stat.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component';



const routes: Routes = [
  {
    path: '',   redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'AdminRegister',  component:AdminRegisterComponent
  },
  {
    path : 'Adminlogin' , component : AdminLoginComponent
  },
  {
    path : 'login' , component : LoginComponent
  },
  {
    path : 'register' , component : RegisterComponent
  },
  {
    path : 'partenaire' , children : [
      {
          path : 'profile' , component : ProfilepComponent
      },
      {
        path : 'evenements' , component : EvenementComponent
    }
  ]
  },
  {
    path : 'admin' , children : [
      {
          path : 'profile' , component : ProfileaComponent
      },
      {
        path : 'users' , component : UsersComponent
    },
    {
      path : 'partenaires' , component : PartenairesComponent
  },
  {
    path : 'categories' , component : CategoriesComponent
},
{
  path : 'calenderier' , component : CalenderierComponent
},
{
  path : 'events' , component : EventsAdminComponent
},
{
  path : 'statistiques' , component : StatComponent
}
  ]
  },
  {
    path : 'client' , children : [
      {
          path : 'profile' , component : ProfilecComponent
      },
      {
        path : 'events' , component : EventscComponent
    },
    {
      path : 'payments' , component : PaymentComponent
  }
  ]
  },
  {
    path: 'logout', component : LogoutComponent   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
