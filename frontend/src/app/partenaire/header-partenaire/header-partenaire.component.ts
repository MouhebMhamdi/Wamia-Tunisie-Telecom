import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-partenaire',
  templateUrl: './header-partenaire.component.html',
  styleUrls: ['./header-partenaire.component.css']
})
export class HeaderPartenaireComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  Logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
    }

}
