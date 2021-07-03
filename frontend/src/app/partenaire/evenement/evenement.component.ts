import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  selectedFile : File = null
  events : any = [];
  events1 : any = [];
  part : any = {};
  categories : any = [];
  constructor(private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEvents();
    this.getCategories();
   // this.getCurrentPartenaire()
    this.getEvents();
  }
  getCategories(){
    axios.get('http://127.0.0.1:8000/admin/categories').then(res=>{

      this.categories = res.data;
      }).catch(err=>{

      })
}
DeleteEvent(id){
  if ( confirm('Voulez-vous supprimer l\'évenement ?') ){
  axios.get('http://127.0.0.1:8000/user/'+id+'/deleteEvent').then(res=>{
    this.getEvents();
    this.getCategories();
   
    this.getEvents(); 
  this.toastr.success('L\'évenement supprimee', 'Notification');

    console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })

}
}
  getCurrentPartenaire(){

    const id = localStorage.getItem('idUser')
    axios.get('http://127.0.0.1:8000/user/partenaire/'+id).then(res => {
      //console.log(res.data[0])
      localStorage.setItem('partenaire',res.data[0]._id) 
      //console.log(this.part)
 
    }).catch(err=>{

    })
  }
  onSelectFile(event){
    console.log(event);
    this.selectedFile = event.target.files[0];

  }
  getMyEvent(id,content){
    this.open(content);
    axios.get('http://127.0.0.1:8000/partenaire/events/'+id).then(res=>{
    this.events1 = res.data;
    console.log(formatDate(new Date(),'dd/MM/yyyy','fr'));
  }).catch(err=>{
    console.log(err);
  })
  
  }
  updateEvent(idEvent,f:NgForm){
    alert(f.controls.date.value)
    const data = new FormData();
    data.append('nom' , f.controls.nom.value)
    data.append('description' , f.controls.description.value)
    data.append('categorie' , f.controls.categorie.value)
    data.append('partenaire' ,localStorage.getItem('partenaire'))
    data.append('prix' , f.controls.prix.value)
    data.append('image' , this.selectedFile)
    data.append('date' , f.controls.date.value)
    data.append('heure' , f.controls.heure.value)
    axios.post('http://127.0.0.1:8000/partenaire/updateEvent/'+idEvent,data).then(res => {
      //this.partenaire = res.data
      
      console.log(res.data);
      this.toastr.success('Evenement ajoutee avec success','Partenaire Notification')
      this.modalService.dismissAll()
    this.getEvents()
 
    }).catch(err=>{

    })
  }
  getEvents(){
    //alert('hello')
    this.getCurrentPartenaire()
    axios.get('http://127.0.0.1:8000/partenaire/'+localStorage.getItem('partenaire')+'/events').then(res=>{
            this.events = res.data;
        }).catch(err=>{
          console.log(err);
        })
}
  addEvent( f : NgForm){
    //const id = localStorage.getItem('idUser')
    const data = new FormData();
      data.append('nom' , f.controls.nom.value)
      data.append('description' , f.controls.description.value)
      data.append('categorie' , f.controls.categorie.value)
      data.append('partenaire' ,localStorage.getItem('partenaire'))
      data.append('prix' , f.controls.prix.value)
      data.append('image' , this.selectedFile)
      data.append('date' , f.controls.date.value)
      data.append('videoUrl' , f.controls.videoUrl.value)
      data.append('heure' , f.controls.heure.value)
    
    console.log(data)
    axios.post('http://127.0.0.1:8000/partenaire/event/add',data).then(res => {
      //this.partenaire = res.data
      
      console.log(res.data);
      this.toastr.success('Evenement ajoutee avec success','Partenaire Notification')
      this.modalService.dismissAll()
    this.getEvents()
 
    }).catch(err=>{

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
