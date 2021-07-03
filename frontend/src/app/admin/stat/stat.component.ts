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
  clients : any ;
  clinetid: any;
  count:[];
  c:any;
  ngOnInit(): void {
    if(sessionStorage.getItem('idUser')!=""){
      if(localStorage.getItem('role')!="Admin"){
        this.router.navigate(['/logout']);
      }
    }
    
    this.getClients();
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

  this.getClients();
}
  getClients(){
      axios.get('http://127.0.0.1:8000/user/clients').then(res=>{
        this.count=res.data;
        this.c=this.count.length
       
        this.clients = res.data;
        this.toastr.success('Le role est changée avec succés ', 'Changement du role');
        }).catch(err=>{

        })
  }
  UpdateRole(id,role){
    axios.post('http://127.0.0.1:8000/user/UpdateRole/'+id+"/"+role).then(res=>{
      this.count=res.data;
      this.c=this.count.length
     
      this.clients = res.data;
      this.getclientbyid(id);
      if(role=="Partenaire"){
       console.log(res.data)
        axios.post('http://127.0.0.1:8000/event/add/',this.clinetid).then(res=>{
        }).catch(err=>{

        })
      }
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
    { data: [45, 37, 60, 70, 46, 33], label: 'Meilleur evenement' }
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
