import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profilec',
  templateUrl: './profilec.component.html',
  styleUrls: ['./profilec.component.css']
})
export class ProfilecComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService,private modalService: NgbModal) { }
  user = {
      username : '',
      email : '',
      nom:'',
      prenom:'',
      tel:''     
  };
  id:any;
  ngOnInit(): void {
    if(sessionStorage.getItem('idUser')!=""){
      if(localStorage.getItem('role')!="Client"){
        this.router.navigate(['/logout']);
        
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

    console.log("hellooo"+this.id);

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
    
    this.user.email=this.user.email = res.data[0].user.email;;

    }).catch(err=>{

    })
}
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   // this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.getProfile();
  });
}
}