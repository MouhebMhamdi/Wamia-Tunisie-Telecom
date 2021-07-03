import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements OnInit {
events : any
  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('idUser')!=""){
      if(localStorage.getItem('role')!="Admin"){
        this.router.navigate(['/logout']);
        
      }
      
    }
    this.getAllEvents()
  }

  getAllEvents(){
      axios.get('http://127.0.0.1:8000/admin/events/nonactive').then(res=>{
      this.events = res.data
      console.log(this.events)
      }).catch(err=>{
        console.log(err)
      })
  }

  activeEvent(idevent){
    axios.get('http://127.0.0.1:8000/admin/event/'+idevent+'/active').then(res=>{
      //this.events = res.data
      this.toastr.success('Evenement validee','Admin Notification')
      this.getAllEvents()
      //console.log(this.events)
      }).catch(err=>{
        console.log(err)
      })
  
  }

}
