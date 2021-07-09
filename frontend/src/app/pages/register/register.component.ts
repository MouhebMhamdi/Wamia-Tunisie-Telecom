import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  categories:any;
  bool:boolean;
  roles:any;
  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    
    this.getCategories();
  }
  getCategories(){
    axios.get('http://127.0.0.1:8000/admin/categories').then(res=>{

      this.categories = res.data;
      }).catch(err=>{

      })
}
  addPartenaire(email,username,pwd,categorie,nom,prenom,tel,adr){
    
    const data = {
      email : email,
      nom : nom,
      prenom : prenom,
      role : "Partenaire",
      username : username,
      password : pwd,
      telephone : tel,
      adresse : adr,
      image : '',
      categorie : categorie,
    }
    console.log(data)
    axios.post("http://127.0.0.1:8000/auth/signup",data).then(res=>{
      console.log(res.data)
      this.toastr.success('Partenaire ajoutee avec succes', 'Notification Administrateur');
    }).catch(err=>{
      this.toastr.success('Impossible  d\'ajoutee ce partenaire', 'Notification Administrateur');
      console.log(err)
    })

  }
  onChange(role){

    if(role=="Partenaire"){
      this.bool=true;
      this.router.navigate(['/register'],{ skipLocationChange: true});
    }else{
      this.bool=false;
      this.router.navigate(['/register'],{ skipLocationChange: true});
    }

  }
  onSubmit( f : NgForm ){
      console.log(f.value);

      if(f.controls.role.value=="Client"){
      const data = {
        username : f.controls.username.value,
        email : f.controls.email.value,
        password : f.controls.password.value,
        role : f.controls.role.value,
        nom:f.controls.nom.value,
        prenom:f.controls.nom.value,
        telephone:f.controls.tel.value,
        adresse:f.controls.adresse.value,
        image:"",
      }
      console.log(data);
      axios.post('http://127.0.0.1:8000/auth/signup',data).then( res => {
            if (res.status == 201 ){
              console.log(res.data)
              this.toastr.success('Inscription utilisateur effectue avec succes', 'Notification d\'inscription');
              f.resetForm();
              
            }

      }).catch( err => {
        console.log(err)
      })
    }
    if(f.controls.role.value=="Partenaire"){
      const data = {
        email : f.controls.email.value,
        nom : f.controls.nom.value,
        prenom : f.controls.prenom.value,
        role : "Partenaire",
        username : f.controls.username.value,
        password : f.controls.password.value,
        telephone : f.controls.tel.value,
        adresse : f.controls.adresse.value,
        image : '',
        categorie : f.controls.categorie.value,
      }
      
      axios.post("http://127.0.0.1:8000/auth/signup",data).then(res=>{
        console.log(res.data)
        this.toastr.success('Partenaire ajoutee avec succes', 'Notification ');
      }).catch(err=>{
        this.toastr.success('Impossible  d\'ajoutee ce partenaire', 'Notification ');
        console.log(err)
      })
  
    }
  }

}
