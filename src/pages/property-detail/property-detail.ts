import { Component } from '@angular/core';
import { ActionSheetController, ActionSheet, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { PropertyService } from '../../app/providers/property-service-mock';
import { ChatPage } from '../chat/chat';

@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html',
    providers:[PropertyService]
})
export class PropertyDetailPage {
    noteListRef: any;
    noteListRefAll: any;
    property: any;
    _Id: string;
    username: string;
    message: string = '';
    Subscription;
    messages: object[] = [];
    userEmail:string;

    constructor(private alertCtrl: AlertController,private afd: AngularFireDatabase, private db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public propertyService: PropertyService, public toastCtrl: ToastController) {
        this.property = this.navParams.data;
        console.log(this.property.id);
     
        this.noteListRef = this.db.object('Workers/asd/');

            this.Subscription = this.db.list('/Workers/').subscribe( data => {
              this.noteListRefAll = data;
            });


        console.log("noteListRefAll 2st -->"+this.property.Uemail);
    }
    ionViewDidLoad() {

        // console.log("noteListRefAll 1st importent on --> "+ this.noteListRefAll[0]);

        // this._Id = this.property.id;
        // this.username = this.property.name;
        
        // console.log("property   this._Id --> " + JSON.stringify(this._Id));
        // console.log("property   this._Id --> " + JSON.stringify(this.username));
        // console.log("property   this._Id --> " + JSON.stringify(this.userEmail));
    }
    // addLike(id: string) {
    //     // console.log("like id->" + id);
    //     // this.noteListRef.id = id;
    //     // let count = 0;

    //     // if (count == 0) {
    //     //     console.log("like added->" + (count + 1));
    //     //     this.noteListRef.update(this.noteListRef.id, {
    //     //         "likes": 10
    //     //     }).then(uUser => { this.navCtrl.pop(); });
    //     //     // return noteListRef.set({"likes":count+1});
    //     //     // return noteListRef.update({"likes":count+1});
    //     // }
    // }



    chat() {
        // console.log("noteListRefAll 1st importent --> " + this.noteListRefAll[0]);
        // console.log("property --> "+ JSON.stringify(this.property));
       
        // this.noteListRef = this.db.object('Workers/asd/' + this._Id);
        this.navCtrl.push(ChatPage, {
            chatItem: this._Id,
            username: this.property.Uemail,
            toId:this.property.email,
            userType:this.property.userType
        }
        );


    }

    share(property) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

    showAlert(title: string, message: string) {
        let alertBox = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
        });
        alertBox.present();
      }
  
    //   loginUser() {
    //       if(/^[a-zA-Z0-9]+$/.test(this.username)) {
    //           // all cool
    //           this.navCtrl.push(ChatPage, {
    //               username: this.username
    //           });
    //       } else {
    //           this.showAlert('Error', 'Invalid Username');
    //       }
    //   }
  

}
