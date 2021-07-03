import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profilep',
  templateUrl: './profilep.component.html',
  styleUrls: ['./profilep.component.css']
})
export class ProfilepComponent implements OnInit {
  user = {
    username : '',
    email : '' ,
    nom:'',
    prenom:'',
    tel:''      
};
  constructor(private router: Router, private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    
    this.getProfile();
  }
  editProfile(f:NgForm){
    const data = {
       
        nom : f.controls.nom.value,
        prenom:f.controls.prenom.value,
        username : f.controls.username.value,
        email:f.controls.email.value,
        telephone:f.controls.tel.value,
    };
    axios.post("http://127.0.0.1:8000/partenaire/profile/"+localStorage.getItem('idUser'),data).then(res=>{
      console.log(res.data)
      this.modalService.dismissAll()
      this.getProfile()
      this.toastr.success('Categorie modifiee avec succes', 'Notification Administrateur');
    }).catch(err=>{
      this.toastr.success('Impossible  de modifiee cette Categorie', 'Notification Administrateur');
      console.log(err)
    })     
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.getProfile();
    });
  }
  getProfile(){
    axios.get('http://127.0.0.1:8000/user/partenaire/'+localStorage.getItem('idUser')).then(res=>{
  
      this.user.nom = res.data[0].nom;
      this.user.prenom = res.data[0].prenom;
      this.user.tel = res.data[0].telephone;
      this.user.username = res.data[0].user.username;
      this.user.email=res.data[0].user.email;
  
      }).catch(err=>{
  
      })
  }

}
