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
      "url": '/../resources/androidicon/rawable-hdpi-icon.png'
    },
    {
      "name": "Tile",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Carpenters",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Plumbers",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Electricians",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Painters",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Ceiling",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Landscaping",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Welding",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Vehicle Repairs",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    },
    {
      "name": "Equipments",
      "url": "/../resources/androidicon/rawable-hdpi-icon.png"
    }
  ];
  @ViewChild(Nav) nav: Nav;
  appMenuItems: Array<MenuItem>;

  accountMenuItems: Array<MenuItem>;

  helpMenuItems: Array<MenuItem>;


  constructor(public navCtrl: NavController,public service: PropertyService,
    public navParams: NavParams, private aFauth: AngularFireAuth,
    private toast: ToastController, private db: AngularFireDatabase, public events: Events) {
     
    
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
this.service.tempWorkerId=this.userEmail;

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
        this.toast.create({
          message: 'Welcome to EasyPooky , ' + user.email,
          duration: 3000
        }).present();

      } else {
        // User is not logged in, redirect to where you need to.
        this.toast.create(
          {
            message: 'Could not find authentication details.',
            duration: 3000
          }
        ).present();
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



}
