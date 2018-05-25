import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AppoinmentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-appoinments',
  templateUrl: 'appoinments.html',
})
export class AppoinmentsPage {
  toId='';
  userType='';
  appoinments:any[]=[];
  Subscription;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.toId = navParams.get('toId');
    this.userType = navParams.get('userType');
    this.getAppoinments();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppoinmentsPage');
  }

  getAppoinments() {
    
    console.log("send email in welcome page --> " + this.toId);
    this.Subscription = this.db.list('/appointments/' + this.toId.replace(/[^a-zA-Z 0-9]+/g, '')).subscribe(data => {
      this.appoinments = data;
      console.log(data);
      for(let appitem of  this.appoinments){
        console.log([appitem].length);
        console.log(appitem);
      }
    });
  }

}
