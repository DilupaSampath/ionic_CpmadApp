import { Component } from '@angular/core';
import { Config, NavController, NavParams } from 'ionic-angular';

import { PropertyDetailPage } from '../property-detail/property-detail';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { PropertyService } from '../../app/providers/property-service-rest';

@Component({
  selector: 'page-property-list',
  templateUrl: 'property-list.html'
})
export class PropertyListPage {
  user: User;
  userEmail: string;
  properties: any[];
  tempProperties: any[];
  searchKey: string = "";
  viewMode: string = "list";
  map;
  markersGroup;
  Subscription;
  private noteListRef: any;
  userType:string='';


  ubscription = this.db.list('/chat').subscribe(data => {
    this.noteListRef = data;
  });

  constructor(public navParams: NavParams, private afd: AngularFireDatabase, public navCtrl: NavController, public service: PropertyService, public config: Config, private db: AngularFireDatabase) {
    this.findAll();
    this.userEmail = navParams.get('userEmail');
    this.userType = navParams.get('userType');
    console.log("logged as --> " + this.userEmail);
  }

  openPropertyDetail(property: any) {
    property.Uemail = this.userEmail;
    property.userType =this.userType;
    this.navCtrl.push(PropertyDetailPage, property);
  }

  onInput(event) {
    console.log("input");
    this.searchHelp(this.searchKey)
      .then(data => {
        this.properties = data;
        console.log(this.properties);
      })
      .catch(error => alert(JSON.stringify(error)));
  }
  searchHelp(searckKey: string) {
    console.log(searckKey);
    let key: string = searckKey.toUpperCase();
    return Promise.resolve(this.properties.filter((property: any) =>
      (property.name + ' ' + property.phonenumber + ' ' + property.city + ' ' + property.type).toUpperCase().indexOf(key) > -1));
  }
  onCancel() {
    console.log("cancel");
    this.findAll()
    
  }

  findAll() {
    this.Subscription = this.afd.list('/Workers/asd').subscribe(data => {
      this.properties = data;
      this.tempProperties = data;
      console.log(this.tempProperties);
    });

  }
  cancelHelp() {
    return Promise.resolve(this.afd.list('/Workers/asd').subscribe(data => {
      this.properties = data;
      console.log(this.properties);
    }));
  }
}
