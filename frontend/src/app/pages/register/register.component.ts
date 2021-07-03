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

  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    /*if(sessionStorage.getItem('idUser')!=""){
      this.toastr.error('Vous etes déja authentifié','Notification d\'inscription')
        this.router.navigate(['/logout']);
        
      
      
    }*/
  }

  onSubmit( f : NgForm ){
      console.log(f.value);
      const data = {
        username : f.controls.username.value,
        email : f.controls.email.value,
        password : f.controls.password.value,
        role : 'Client'
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
