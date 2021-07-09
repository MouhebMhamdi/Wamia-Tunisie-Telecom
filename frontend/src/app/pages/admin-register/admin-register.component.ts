
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit( f : NgForm ){
    

    const data = {
      username : f.controls.username.value,
      email : f.controls.email.value,
      password : f.controls.password.value,
      nom:f.controls.nom.value,
      prenom:f.controls.nom.value,
      telephone:String(f.controls.tel.value),
      adresse:f.controls.adresse.value,
      image:"",
      role : "Admin",
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
 

}
