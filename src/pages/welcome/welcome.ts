import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Nav, IonicPage, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PropertyListPage } from '../property-list/property-list';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatPage } from '../chat/chat';
import { EditPage } from '../edit/edit';
import { PropertyService } from '../../app/providers/property-service-mock';
export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})

export class WelcomePage {
  // private noteListRef = this.db.list<any>('Workers/asd');
  properties: any[];
  chats: any[];
  chatsUser: any[];
  page = 'PropertyListPage';
  userType: any;
  userEmail; string;
  Subscription;
  // workers1: any=
  //     {
  //         "name":'XXXXXX',
  //         "url":'/../XXXXX/androidicon/rawable-hdpi-icon.png'
  //     };
  workers: any[] = [
    {
      "name": 'Masons',
      "url": 'https://image.freepik.com/free-icon/construction-worker_318-105590.jpg'
    },
    {
      "name": "Tile",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX3exoyroQB1Ymb1-kQ0G0fV_ePRdIDR9j7rdmNcXi5aELKG5G"
    },
    {
      "name": "Carpenters",
      "url": "https://cdn1.iconfinder.com/data/icons/misc-v-4/512/repair_carpenter_builder_joiner-256.png"
    },
    {
      "name": "Plumbers",
      "url": "https://www.shareicon.net/data/128x128/2016/02/04/714030_drop_512x512.png"
    },
    {
      "name": "Electricians",
      "url": "https://cdn.iconscout.com/public/images/icon/premium/png-128/electrical-plug-connector-in-power-34c259541c01deed-128x128.png"
    },
    {
      "name": "Painters",
      "url": "https://www.shareicon.net/data/256x256/2016/01/08/699987_people_512x512.png"
    },
    {
      "name": "Ceiling",
      "url": "https://cdn0.iconfinder.com/data/icons/construction-and-maintenance-2/50/Roof-256.png"
    },
    {
      "name": "Landscaping",
      "url": "https://www.shareicon.net/data/256x256/2016/01/08/699913_people_512x512.png"
    },
    {
      "name": "Welding",
      "url": "https://image.flaticon.com/icons/png/128/289/289810.png"
    },
    {
      "name": "Vehicle Repairs",
      "url": "https://image.flaticon.com/icons/png/128/0/429.png"
    },
    {
      "name": "Equipments",
      "url": "https://cdn0.iconfinder.com/data/icons/gadgets-16/128/tools_settings_equipment_instruments-128.png"
    },
    {
      "name": "CCTV",
      "url": "https://image.flaticon.com/icons/png/128/534/534204.png"
    },
    {
      "name": "Solar Panel Fixing",
      "url": "https://cdn4.iconfinder.com/data/icons/industrial-vol-2/72/93-128.png"
    },
    {
      "name": "Rent Tools ",
      "url": "https://www.shareicon.net/data/128x128/2015/12/31/696128_rent_512x512.png"
    }
  ];
  @ViewChild(Nav) nav: Nav;
  appMenuItems: Array<MenuItem>;

  accountMenuItems: Array<MenuItem>;

  helpMenuItems: Array<MenuItem>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams, private aFauth: AngularFireAuth,
    private toastCtrl: ToastController, private db: AngularFireDatabase, public events: Events) {
     
    
    this.appMenuItems = [
      { title: 'Home', component: WelcomePage, icon: 'home' },
      { title: 'Workers', component: PropertyListPage, icon: 'people' }
    ];

    this.accountMenuItems = [
      { title: 'My Account', component: EditPage, icon: 'ios-contact' },
      { title: 'Logout', component: WelcomePage, icon: 'log-out' },
    ];

    this.helpMenuItems = [
      { title: 'Welcome', component: WelcomePage, icon: 'bookmark' }
    ];

    this.userType = navParams.get('type');
    this.userEmail = navParams.get('uName');
    console.log("logged as --> " + JSON.stringify(this.userType));
    console.log("logged as --> " + JSON.stringify(this.userEmail));
// this.service.tempWorkerId=this.userEmail;

    events.subscribe('user:created', (data: any) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome---> ' + JSON.stringify(data));
    });


  }
  ionViewDidLoad() {
    // this.addNote(); 
this.getChats();
    this.aFauth.auth.onAuthStateChanged((user) => {
      console.log("user--> " + JSON.stringify(user));
      if (user && user.email && user.uid) {
        this.presentToast( 'Hi.. '+user.email+ ' Welcome to EasyPooky');


      } else {
        // User is not logged in, redirect to where you need to.
        this.presentToast(' Could not find authentication details for '+user.email) ;
      }
    });

  }

  getData() {
    console.log("working");

  }
  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(this.page);
    
    this.navCtrl.push(PropertyListPage, { userEmail: this.userEmail, userType: this.userType });
  }
  getChats() {
    
    console.log("send email in welcome page --> " + this.userEmail);
    this.Subscription = this.db.list('/chat/' + this.userEmail.replace(/[^a-zA-Z 0-9]+/g, '')).subscribe(data => {
      this.chats = data;
      for(let item of this.chats){
        console.log([item].length);
      }
    });
  }
  //    addNote() {
  //        return this.noteListRef.push(this.workers1);
  //    }
  chatWorker(myTag:string){
    
    this.navCtrl.push(ChatPage, {
      chatItem: '',
      username: myTag,
      toId:this.userEmail,
      userType:'Worker'
  }
  );
  }
  chatUser(myTag:string){
    this.navCtrl.push(ChatPage, {
      chatItem: '',
      username: myTag,
      toId:this.userEmail,
      userType:'User'
  }
  );
  }


  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
