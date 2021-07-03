import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private toastr: ToastrService) { }
  clients : any ;
  ngOnInit(): void {
    this.getClients();
  }
  activeUser(id){
    console.log(id)
    axios.get('http://127.0.0.1:8000/user/'+id+'/active/change').then(res=>{
    console.log(res.data);
    this.getClients();
    this.toastr.success('L\'etat d\'utilisateur changee avec succes', 'Notification Administrateur');
      //this.partenaires = res.data;
      }).catch(err=>{

      })
    
  }
  DeleteUser(id){
    if ( confirm('Voulez-vous supprimer l\'utilisateur ?') ){
    axios.get('http://127.0.0.1:8000/user/'+id+'/delete').then(res=>{
    this.getClients()  
    this.toastr.success('L\'utilisateur supprimee', 'Notification Administrateur');

      console.log(res.data);
      }).catch(err=>{
        console.log(err);
      })

  }
}
  getClients(){
      axios.get('http://127.0.0.1:8000/user/clients').then(res=>{

        this.clients = res.data;
        }).catch(err=>{

        })
  }

    
}
