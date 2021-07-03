import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private toastr: ToastrService,private router: Router) { }
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
  }

  onSubmit( f : NgForm ){
      console.log(f.value);
      axios.post('http://127.0.0.1:8000/auth/signin',f.value).then( res => {
            if (res.status == 200 ){
              console.log(res.data)
              localStorage.setItem('token',res.data.token)  
              localStorage.setItem('role',res.data.user.role)
              localStorage.setItem('email',res.data.user.email)
              localStorage.setItem('username',res.data.user.username)
              localStorage.setItem('idUser',res.data.user._id)
              sessionStorage.setItem('idUser',res.data.user._id)
              console.log(sessionStorage.getItem("idUser"));
              if ( res.data.user.role == "Client" ){
                  axios.get('http://127.0.0.1:8000/user/client/'+res.data.user._id).then(client => {
                    //localStorage.setItem('categorie',client.data.categorie)
                    this.router.navigate(['/client/profile']);
                  }).catch(err=>{

                  })
                this.router.navigate(['/client/profile']);
              }else if (res.data.user.role == "Partenaire"){
                        axios.get('http://127.0.0.1:8000/user/partenaire/'+res.data.user._id).then(partenaire => {
                          localStorage.setItem('categorie',partenaire.data[0].categorie)
                          this.router.navigate(['/partenaire/profile']);
                        }).catch(err=>{

                        })
                
              }else{
                this.router.navigate(['admin/statistiques']);
              }
              
              //this.toastr.success('Inscription utilisateur effectue avec succes', 'Notification d\'inscription');
              //f.resetForm();
              
            }
            

      }).catch( err => {
      
        this.toastr.error('Impossible de connecter avec ce compte, verifiee vos coordonnes ou contactez Admin', 'Notification d\'inscription');
        f.resetForm();
        console.log(err)
      })

  }

}
