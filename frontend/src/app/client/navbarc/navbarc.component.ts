import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarc',
  templateUrl: './navbarc.component.html',
  styleUrls: ['./navbarc.component.css']
})
export class NavbarcComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  Logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
    }

}
