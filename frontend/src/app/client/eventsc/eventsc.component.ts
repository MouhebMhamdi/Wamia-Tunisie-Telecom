import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-eventsc',
  templateUrl: './eventsc.component.html',
  styleUrls: ['./eventsc.component.css']
})
export class EventscComponent implements OnInit {
  data : {
    amount:"",
    code:"",
    nbrTicket:"",
    price:"",
  }
url:string;
nbr:any;
newprix:Number;
events : any;
oneEvents:any;
handler:any = null;
urlSafe: SafeResourceUrl;

  constructor(private router: Router,public sanitizer: DomSanitizer,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('idUser')!=""){
      if(localStorage.getItem('role')!="Client"){
        this.router.navigate(['/logout']);
      }
      
    }
    this.loadStripe();
    this.getAllActiveEvents()
  }
  doSomething(gg,id){
    this.searchEventByID1(id);
    this.newprix=this.events.prix*gg.target.value;
  }
  searchEventByID1(id){
   
    axios.get('http://127.0.0.1:8000/user/searchEventByid/'+id).then(res=>{
          this.events = res.data;
          this.newprix=res.data.prix;
        }).catch(err=>{
          console.log(err)
        })
  }
searchEventByID(id,content){
  this.open(content);
  axios.get('http://127.0.0.1:8000/user/searchEventByid/'+id).then(res=>{
        this.oneEvents = res.data;
        this.newprix=res.data.prix;
        this.url="https://www.youtube.com/embed/"+this.oneEvents.videoUrl+"?autoplay=1";
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

      }).catch(err=>{
        console.log(err)
      })
}
  serachEvent(event){
    if (event.target.value === ""){

this.getAllActiveEvents()
    }
    axios.get('http://127.0.0.1:8000/user/events/'+event.target.value).then(res=>{
      this.events = res.data
      this.newprix=res.data.prix;
      }).catch(err=>{
        console.log(err)
      })
      //console.log(this.events);

  }
  
  getAllActiveEvents(){
    axios.get('http://127.0.0.1:8000/admin/events/active').then(res=>{
      this.events = res.data
      this.data.price=res.data.prix;
      }).catch(err=>{
        console.log(err)
      })
      console.log(this.events);
  }
  pay(idEvent:any,amount: any,f:NgForm) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token.id)
        alert('Payment éfféctuer avec succés');
        const data = {
     
          amout:amount,
          code:token.id,
          nbrTicket:f.controls.nbrTicket.value,
          price:amount*f.controls.nbrTicket.value,
      };
      axios.post("http://127.0.0.1:8000/user/payment/"+localStorage.getItem('idUser')+"/"+idEvent,data).then(res=>{
        console.log(res.data)
        this.modalService.dismissAll()
        
        this.toastr.success('Categorie modifiee avec succes', 'Notification Administrateur');
      }).catch(err=>{
        this.toastr.success('Impossible  de modifiee cette Categorie', 'Notification Administrateur');
        console.log(err)
      })  

      }
    });
 
    handler.open({
      name: 'Wamia',
      description: 'Mobile tikiting',
      amount: amount * 100
    });
 
  }
 
  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.getAllActiveEvents()
    });
  }
}
