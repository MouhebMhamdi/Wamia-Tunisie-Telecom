import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profilea',
  templateUrl: './profilea.component.html',
  styleUrls: ['./profilea.component.css']
})
export class ProfileaComponent implements OnInit {

  constructor(private router: Router,private toastr: ToastrService,private modalService: NgbModal) { }
  user = {
    username : '',
    email : '',
    nom:'',
    prenom:'',
    tel:''    
};
ngOnInit(): void {
  if(sessionStorage.getItem('idUser')!=""){
    if(localStorage.getItem('role')=="Admin"){
      this.router.navigate(['/admin/profile']);
    }
    if(localStorage.getItem('role')=="Client"){
      this.router.navigate(['/client/profile']);
    }
    if(localStorage.getItem('role')=="Partenaire"){
      this.router.navigate(['/partenaire/profile']);
    }
  }
  if (localStorage.getItem('token') == null ){
    this.router.navigate(['/login']);

  }

  this.getProfile();
  axios.get('http://127.0.0.1:8000/user/client/'+localStorage.getItem("idUser")).then( res => {
          this.user.nom=res.data[0].nom;
          this.user.prenom=res.data[0].prenom;
          this.user.tel=res.data[0].telephone;
          
    }).catch( err => {

    })
    this.getProfile();
    console.log(localStorage.getItem("idUser")+this.user.nom);
}

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   // this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
   // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
editProfile(f:NgForm){
  const data = {
     
      nom : f.controls.nom.value,
      prenom:f.controls.prenom.value,
      username : f.controls.username.value,
      email:f.controls.email.value,
      telephone:f.controls.tel.value,
  };
  axios.post("http://127.0.0.1:8000/user/profile/"+localStorage.getItem('idUser'),data).then(res=>{
    console.log(res.data)
    this.modalService.dismissAll()
    this.getProfile()
    this.toastr.success('Categorie modifiee avec succes', 'Notification Administrateur');
  }).catch(err=>{
    this.toastr.success('Impossible  de modifiee cette Categorie', 'Notification Administrateur');
    console.log(err)
  })     
}
getProfile(){
  axios.get('http://127.0.0.1:8000/user/client/'+localStorage.getItem('idUser')).then(res=>{

    this.user.nom = res.data[0].nom;
    this.user.prenom = res.data[0].prenom;
    this.user.tel = res.data[0].telephone;
    this.user.username = res.data[0].user.username;
    this.user.email = res.data[0].user.email;


    }).catch(err=>{

    })
}

}
