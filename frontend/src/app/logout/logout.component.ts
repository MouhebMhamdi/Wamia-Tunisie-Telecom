import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.Logout();
  }
  Logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
    }
}
