import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { item } from "./test-sensors/test.model"
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestSensorService {
  // sensorsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  // sensorRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

  private dbPath = '/sensor';
  sensorRef: AngularFireObject<any>;    
  sensorsRef: AngularFireList<any>;    

  constructor(private db: AngularFireDatabase) { 
    this.sensorRef = db.object(this.dbPath);
  }

  setValue(data : any){
    this.sensorRef.set(data).then(_ => console.log(`set ${data}`));
  }

  // Fetch single item
  getItem(id : string){
    this.sensorRef = this.db.object('moisture/' + id);
    return this.sensorRef;
  }

  // Fetch Item list
  getItemListM() {
    this.sensorsRef = this.db.list('moisture/');
    return this.sensorsRef;
  }

  getItemListP() {
    this.sensorsRef = this.db.list('pH/');
    return this.sensorsRef;
  }

  getItemListA() {
    this.sensorsRef = this.db.list('alcohol/');
    return this.sensorsRef;
  }

  getItemListT() {
    this.sensorsRef = this.db.list('temperature/');
    return this.sensorsRef;
  }


  
  }


