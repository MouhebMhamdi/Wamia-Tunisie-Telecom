import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label,MultiDataSet,Color } from 'ng2-charts';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  constructor(private toastr:ToastrService,private router:Router) { }
  som:number=0;
  nbrTickets:number=0;
  clients : any ;
  clinetid: any;
  nb:number = 0;
  partenaires:any;
  data1:any;
  nbrpart:number=0;
  nbrAdmin:number=0;
  count:[];
  c:any;
  i:number=0;
  ngOnInit(): void {
    if(sessionStorage.getItem('idUser')!=""){
      if(localStorage.getItem('role')!="Admin"){
        this.router.navigate(['/logout']);
      }
    }
    
    this.getClients();
    this.getPartenaires();
    this.getPayment();
    this.c=this.count;
    console.log(this.c.length);
  }
  getclientbyid(id){
    axios.get('http://127.0.0.1:8000/user/client'+id).then(res=>{
      this.clinetid=res.data;    
      }).catch(err=>{

      })
  }
  activeUser(id){
    console.log(id)
    axios.get('http://127.0.0.1:8000/user/'+id+'/active/change').then(res=>{
    
    
  
    this.getClients();
    this.getPartenaires();
    
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

    
      }).catch(err=>{
        console.log(err);
      })

  }
}
onChange(event,id) {

  console.log(event+"id= "+id);
  this.UpdateRole(id,event);
  this.toastr.success('Le role est changée avec succés ', 'Changement du role');
    this.getPartenaires();
    this.getClients();
    
    this.router.navigate(['/admin/statistiques']);
}
  getClients(){
      axios.get('http://127.0.0.1:8000/user/clients').then(res=>{
        
        for(let list of res.data){
          if(list.user.role=="Client"){
             this.i++;}
             if(list.user.role=="Admin"){
               this.nbrAdmin++;
             }
        }
        this.count=res.data;
        this.c=this.nbrAdmin+this.i;
        console.log(this.nbrpart)
        
        this.clients = res.data;
        console.log("nbr part: "+this.nb)
        console.log("nbr client: "+this.i)
        console.log("nbr Admin: "+this.nbrAdmin)
        }).catch(err=>{

        })
        
  }
  async getPayment(){
    
    await axios.get('http://127.0.0.1:8000/user/getPayments').then(res=>{

     
        for(let r of res.data){
          this.som+=Number(r.price);
          this.nbrTickets+=Number(r.nbrTicket);
        }
      

      }).catch(err=>{

      })
  }
  async getPartenaires(){
    await axios.get('http://127.0.0.1:8000/user/Partenaires').then(res=>{
     
      
     this.nb=res.data.length;
      console.log(this.nb)
      this.count=res.data;
      this.partenaires = res.data;
      }).catch(err=>{

      })
}
  addPartenaire(email,username,pwd,categorie){
    const data = {
      email : email,
      nom : "",
      prenom : '',
      role : "Partenaire",
      username : username,
      password : pwd,
      telephone : "",
      adresse : "",
      image : "",
      categorie : categorie,
    }
    axios.post("http://127.0.0.1:8000/auth/signup",data).then(res=>{
      console.log(res.data)
      this.toastr.success('Partenaire ajoutee avec succes', 'Notification Administrateur');
    }).catch(err=>{
      this.toastr.success('Impossible  d\'ajoutee ce partenaire', 'Notification Administrateur');
      console.log(err)
    })

  }
  UpdateRole(id,role){

    const partenaire ={
      nom : "" ,
      prenom : "" ,
      user : id ,
      adresse : "" ,
      telephone : "" ,
      image : "" ,
      categorie : "60e24b80868d0217684f8811"
  }
    axios.post('http://127.0.0.1:8000/user/UpdateRole/'+id+"/"+role,partenaire).then(res=>{
      this.count=res.data;
      this.c=this.count.length
     
      this.clients = res.data;
      this.getclientbyid(id);
      this.getClients();
      this.getPartenaires();
      this.toastr.success('Le role est changée avec succés ', 'Changement du role');

      }).catch(err=>{

      })
}

  //bar chart ====================================
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Hackathon', 'Sport', 'Film', 'Theatre', 'Transport'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [2, 37, 60, 70, 46, 33], label: 'Meilleur evenement' }
  ];
  //===============================================
  //dought chart==================================
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  //===========================================
  //line chart ===============================
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Recette par semaine' },
  ];

  lineChartLabels: Label[] = ['Jan', 'Fev', 'Mars', 'Avril', 'Mai', 'Juin'];

  lineChartOptions = {
    responsive: true,
  };

  

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

}
