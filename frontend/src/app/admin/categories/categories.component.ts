import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories : any;
  editCat : {
    _id : '',
    nom : '',
    description : '',
  } ;
  constructor(private modalService: NgbModal,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('idUser')!=""){
      if(localStorage.getItem('role')!="Admin"){
        this.router.navigate(['/logout']);
        
      }
      
    }
    this.getCategories()
  }

  editCategorie(f:NgForm){
    const data = {
        _id : this.editCat._id,
        nom : f.controls.nom.value,
        description : f.controls.description.value
    };
    axios.post("http://127.0.0.1:8000/admin/categorie/update",data).then(res=>{
      console.log(res.data)
      this.modalService.dismissAll()
      this.getCategories()
      this.toastr.success('Categorie modifiee avec succes', 'Notification Administrateur');
    }).catch(err=>{
      this.toastr.success('Impossible  de modifiee cette Categorie', 'Notification Administrateur');
      console.log(err)
    })     
  }
  getCategories(){
    axios.get('http://127.0.0.1:8000/admin/categories').then(res=>{

      this.categories = res.data;
      }).catch(err=>{

      })
}
 
  addCategorie(f:NgForm){
  
    axios.post("http://127.0.0.1:8000/admin/categorie/add",f.value).then(res=>{
      console.log(res.data)
      this.modalService.dismissAll()
      this.getCategories()
      this.toastr.success('Categorie ajoutee avec succes', 'Notification Administrateur');
    }).catch(err=>{
      this.toastr.success('Impossible  d\'ajoutee cette Categorie', 'Notification Administrateur');
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
openEdit(content,c) {
  console.log(c)
  this.editCat = c
  console.log(this.editCat)
  //this.editCat.description = c.description
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   // this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
   // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

deleteCategorie(id){
if (confirm('Voules-vous vraiment supprimer cette categorie?')){
  axios.get('http://127.0.0.1:8000/admin/categorie/'+id+'/delete').then(res=>{

    this.toastr.success('Categorie supprimee avec succes', 'Notification Administrateur');
    this.getCategories()
      //this.categories = res.data;
      }).catch(err=>{
        this.toastr.success('Impossible de supprimer cette categorie', 'Notification Administrateur');
      })
}
 
  

}

}
