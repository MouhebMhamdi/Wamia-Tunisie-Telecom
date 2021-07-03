import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css']
})
export class PartenairesComponent implements OnInit {
  partenaires : any;
  categories : any;
  constructor(private modalService: NgbModal,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('idUser')!=""){
      if(localStorage.getItem('role')!="Admin"){
        this.router.navigate(['/logout']);
        
      }
      
    }
    this.getPartenaires()
    this.getCategories();

  }
  getCategories(){
    axios.get('http://127.0.0.1:8000/admin/categories').then(res=>{

      this.categories = res.data;
      }).catch(err=>{

      })
}
  DeleteUser(id){
    if ( confirm('Voulez-vous supprimer l\'utilisateur ?') ){
      axios.get('http://127.0.0.1:8000/user/'+id+'/delete').then(res=>{
        this.getPartenaires()
        this.toastr.success('L\'utilisateur supprimee', 'Notification Administrateur');
        console.log(res.data);
        }).catch(err=>{
          console.log(err);
        })
    }
   

  }
  getPartenaires(){
    axios.get('http://127.0.0.1:8000/user/partenaires').then(res=>{

      this.partenaires = res.data;
      console.log( this.partenaires)
      }).catch(err=>{

      })
}
  activeUser(id){
    console.log(id)
    axios.get('http://127.0.0.1:8000/user/'+id+'/active/change').then(res=>{
    console.log(res.data);
    this.getPartenaires()
    this.toastr.success('L\'etat d\'utilisateur changee avec succes', 'Notification Administrateur');
      //this.partenaires = res.data;
      }).catch(err=>{

      })
    
  }
  addPartenaire(f:NgForm){
    const data = {
      email : f.controls.email.value,
      nom : f.controls.nom.value,
      prenom : f.controls.prenom.value,
      role : "Partenaire",
      username : f.controls.username.value,
      password : f.controls.password.value,
      telephone : f.controls.telephone.value,
      adresse : f.controls.adresse.value,
      image : f.controls.image.value,
      categorie : f.controls.categorie.value,
    }
    axios.post("http://127.0.0.1:8000/auth/signup",data).then(res=>{
      console.log(res.data)
      this.modalService.dismissAll()
      this.getPartenaires()
      this.toastr.success('Partenaire ajoutee avec succes', 'Notification Administrateur');
    }).catch(err=>{
      this.toastr.success('Impossible  d\'ajoutee ce partenaire', 'Notification Administrateur');
      console.log(err)
    })

  }
// Models
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   // this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
   // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


}
