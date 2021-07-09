import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StripeModule } from "stripe-angular"
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { UsersComponent } from './admin/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilepComponent } from './partenaire/profilep/profilep.component';
import { ProfileaComponent } from './admin/profilea/profilea.component';
import { ProfilecComponent } from './client/profilec/profilec.component';
import { PartenairesComponent } from './admin/partenaires/partenaires.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './admin/categories/categories.component';
import { EvenementComponent } from './partenaire/evenement/evenement.component';



import { HeaderPartenaireComponent } from './partenaire/header-partenaire/header-partenaire.component';
import { EventsAdminComponent } from './admin/events-admin/events-admin.component';
import { CalenderierComponent } from './admin/calenderier/calenderier.component';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventscComponent } from './client/eventsc/eventsc.component';
import { NavbarcComponent } from './client/navbarc/navbarc.component';
import { LogoutComponent } from './logout/logout.component';
import { PaymentComponent } from './client/payment/payment.component';
import { StatComponent } from './admin/stat/stat.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component'; // a plugin!
//import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  //interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    HomeComponent,
    ProfilepComponent,
    ProfileaComponent,
    ProfilecComponent,
    PartenairesComponent,
    HeaderAdminComponent,
    CategoriesComponent,
    EvenementComponent,
    HeaderPartenaireComponent,
    EventsAdminComponent,
    CalenderierComponent,
    EventscComponent,
    NavbarcComponent,
    LogoutComponent,
    PaymentComponent,
    StatComponent,
    AdminLoginComponent,
    AdminRegisterComponent
  ],
  imports: [
    BrowserModule, NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), NgbModule, // ToastrModule added
    FullCalendarModule, // register FullCalendar with you app
    StripeModule.forRoot("WefiEya"), 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
