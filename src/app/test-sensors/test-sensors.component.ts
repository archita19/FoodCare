import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TestSensorService } from '../test-sensor.service';
import { item } from './test.model';
import { Chart } from 'chart.js';
// import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-sensors',
  templateUrl: './test-sensors.component.html',
  styleUrls: ['./test-sensors.component.css']
})
export class TestSensorsComponent implements OnInit {
  testSensorForm : FormGroup;
  opt : string = "";
  pres : string = "";
  mres : string = "";
  ares : string = "";
  tres : string = "";
  res : string = "";

  // items : item[];
  itemP : item[];
  itemM : item[];
  itemA : item[];
  itemT : item[];

  // foods : dropdown[];

  numP = new Array();
  numM = new Array();
  numA = new Array();
  numT = new Array();

  foods : any = ['Apple','Orange','Banana','Grapes','Chikoo'];

  chart : any = [];
  chartm : any = [];
  charta : any = [];
  chartt : any = [];
  chartall : any = [];

  chartData = null;

  // lineChartData: ChartDataSets[] = [];

  // lineChartLabels: Label[] = ['1','2','3','4','5','6','7','8','9','10'];

  // lineChartOptions = {
  //   responsive: true,
  // };

  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,255,0,0.28)',
  //   },
  // ];

  // lineChartLegend = true;
  // lineChartPlugins = [];
  // lineChartType = 'line';

  constructor(public fb : FormBuilder,public sens : TestSensorService,public authService: AuthService,private router: Router) {
    this.createForm();
   }
  
  changeItem(e) {
    this.opt = e.target.value;
    console.log(this.opt);
  }

  // getDropdown() {
  //   return this.testSensorForm.get('foodItem');
  // }

  createForm() {
    this.testSensorForm = this.fb.group({
      foodItem: ['', Validators.required ]
    });
  }

  Logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

  sensorVal(data){
    this.sens.setValue(data);
    if(data == 1){
      // this.getValuesP(val);
      this.getValuesP();
    }
    else if(data == 2){
      this.getValuesM();
    }
    else if(data == 3){
      this.getValuesA();
    }
    else if(data == 4){
      this.getValuesT();
    }    
  }

  getValuesM() {
    let s = this.sens.getItemListM();
    s.snapshotChanges().subscribe(data => {
      this.itemM = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        console.log(Number(a['value']));
        var num = Number(a['value']);
        this.numM.push(num);
        a['key'] = item.key;
        this.itemM.push(a as item);
        this.inferenceM(this.numM);
        this.chartM(this.numM);
        // val = this.items.slice(-1)[0].value;
        // console.log(this.items[this.items.length-1]);
      })
    })
  }

  getValuesP() {
    let s = this.sens.getItemListP();
    s.snapshotChanges().subscribe(data => {
      this.itemP = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        // console.log(Number(a['value']));
        var num = Number(a['value']);
        this.numP.push(num);
        a['key'] = item.key;
        this.itemP.push(a as item);
        // this.inference(this.nums,val);
        this.inferenceP(this.numP);
        this.chartPH(this.numP);
        // val = this.items.slice(-1)[0].value;
        // console.log(this.items[this.items.length-1]);
      })
    })
  }

  getValuesA() {
    let s = this.sens.getItemListA();
    s.snapshotChanges().subscribe(data => {
      this.itemA = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        console.log(Number(a['value']));
        var num = Number(a['value']);
        this.numA.push(num);
        a['key'] = item.key;
        this.itemA.push(a as item);
        this.inferenceA(this.numA);
        this.chartA(this.numA);
        // val = this.items.slice(-1)[0].value;
        // console.log(this.items[this.items.length-1]);
      })
    })
  }

  getValuesT() {
    let s = this.sens.getItemListT();
    s.snapshotChanges().subscribe(data => {
      this.itemT = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        console.log(Number(a['value']));
        var num = Number(a['value']);
        this.numT.push(num);
        a['key'] = item.key;
        this.itemT.push(a as item);
        this.inferenceT(this.numT);
        this.chartT(this.numT);
        // val = this.items.slice(-1)[0].value;
        // console.log(this.items[this.items.length-1]);
      })
    })
  }

  // inference(num,val) {
  //   // console.log(val);
  //   if(val.foodItem == 'Apple') {
  //     console.log(val.foodItem);
  //     if(num[num.length-1] > 5 && num[num.length-1] < 7){
  //        this.res = 'optimum';
  //     }
  //   }
  //   else{
  //       this.res = '';
  //   }
  //   // console.log(this.itemP[this.itemP.length - 1]);
  // }

  inferenceP(num) {
    if(this.opt == '1: Apple') {
      // console.log(val.foodItem);
      if(num[num.length-1] > 5 && num[num.length-1] < 7){
         this.pres = 'optimum';
      }
      else{
        this.pres = 'not optimum';
      }
    }
    else {
      this.pres = '';
    }
  }

  inferenceM(num) {
    if(this.opt == '1: Apple') {
      // console.log(val.foodItem);
      if(num[num.length-1] > 5 && num[num.length-1] < 7){
         this.mres = 'optimum';
      }
      else{
        this.mres = 'not optimum';
      }
    }
    else {
      this.mres = '';
    }
  }

  inferenceA(num) {
    if(this.opt == '1: Apple') {
      // console.log(val.foodItem);
      if(num[num.length-1] > 5 && num[num.length-1] < 7){
         this.ares = 'optimum';
      }
      else{
        this.ares = 'not optimum';
      }
    }
    else {
      this.ares = '';
    }
  }

  inferenceT(num) {
    if(this.opt == '1: Apple') {
      // console.log(val.foodItem);
      if(num[num.length-1] > 5 && num[num.length-1] < 7){
         this.tres = 'optimum';
      }
      else{
        this.tres = 'not optimum';
      }
    }
    else {
      this.tres = '';
    }
  }

  results() {
    this.res = '';
    if(this.pres == 'optimum' && this.mres == 'optimum' && this.ares == 'optimum' && this.tres == 'optimum'){
      this.res = 'The fruit is consumable';
    }
    else if(this.pres == '' && this.mres == '' && this.ares == '' && this.tres == ''){
      this.res = '';
    }
    else{
      this.res = 'The fruit is not consumable';
    }
    this.sensorVal(0);
    this.chartAll(this.numP,this.numM,this.numA,this.numT);
  }

  // canvasP = document.getElementById('canvasP');

  chartPH(num) {
    // this.lineChartData =[
    //   { data: num, label: 'Crude oil prices' },
    // ];
    this.chart = new Chart('canvasP', {
      type : 'line',
      data : {
        labels : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14'],
        datasets : [
          {
            label : 'pH',
            data : num,
            borderColor : "#d81b60",
            fill : false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
            yAxes: [{
                display: true,
            }]
        }
      }
    })

  }

  valM = ["10","20","30","40","50","60","70","80","90","100"];
  chartM(num) {
    this.chartm = new Chart('canvasM', {
      type : 'line',
      data : {
        labels : this.valM,
        datasets : [
          {
            label : 'Moisure',
            data : num,
            borderColor : "#d81b60",
            fill : false
          }
        ]
      },
      options : {
        responsive : true,
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
    // this.chart.data.datasets.data = this.numM;
    // this.chart.update();
    // this.chartm.update();
  }

  valA = [100,200,300,400,500,600,700,800,900,1000];
  chartA(num) {
    this.charta = new Chart('canvasA', {
      type : 'line',
      data : {
        labels : this.valA,
        datasets : [
          {
            label : 'Alcohol',
            data : num,
            borderColor : "#d81b60",
            fill : false
          }
        ]
      },
      options : {
        responsive : true,
        scales: {
          yAxes: [{
            display: true,
          }]
        }
      }
    })
    // this.chart.data.datasets.data = this.numM;
    // this.chart.update();
  }


  // valT = [10,20,30,40,50,60,70,80,90,100];
  chartT(num) {
    this.chartt = new Chart('canvasT', {
      type : 'line',
      data : {
        labels : this.valM,
        datasets : [
          {
            label : 'Temperature',
            data : num,
            borderColor : "#d81b60",
            fill : false
          }
        ]
      },
      options : {
        responsive : true,
        scales: {
          yAxes: [{
            display: true,
          }]
        }
      }
    })
    // // this.chart.data.datasets.data = this.numM;
    // // this.chart.update();
  }

  chartAll(nump,numm,numa,numt){
    this.chartt = new Chart('canvasAll', {
      type : 'line',
      data : {
        labels : ["1","2","3","4","5","6","7","8","9","10"],
        datasets : [
          {
            label : 'ph',
            data : nump,
            borderColor : "#ff33cc",
            fill : false
          },
          {
            label : 'moisture',
            data : numm,
            borderColor : "#66ffff",
            fill : false
          },
          {
            label : 'alcohol',
            data : numa,
            borderColor : "#9966ff",
            fill : false
          },
          {
            label : 'temperature',
            data : numt,
            borderColor : "#ffcc66",
            fill : false
          }
        ]
      },
      options : {
        responsive : true,
        scales: {
          yAxes: [{
            display: true,
          }]
        }
      }
    })
  }

  ngOnInit(){

  }
}
