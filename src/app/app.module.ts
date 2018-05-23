import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {WelcomePage} from '../pages/welcome/welcome';
import {PropertyListPage} from '../pages/property-list/property-list';
import {PropertyDetailPage} from '../pages/property-detail/property-detail';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from'angularfire2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PropertyService } from './providers/property-service-rest';
import { ChatPage } from '../pages/chat/chat';
import { EditPage } from '../pages/edit/edit';

const firebaseConfig = {
  apiKey: "AIzaSyD8pYw45d3JzBxAnSJFxSmRDmiKnivlp5Y",
  authDomain: "ionicapp-8fdbe.firebaseapp.com",
  databaseURL: "https://ionicapp-8fdbe.firebaseio.com",
  projectId: "ionicapp-8fdbe",
  storageBucket: "ionicapp-8fdbe.appspot.com",
  messagingSenderId: "707913552448"
};
@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    WelcomePage,
    PropertyListPage,
    PropertyDetailPage,
    LoginPage,
    RegisterPage ,
    EditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    WelcomePage,
    PropertyListPage,
    PropertyDetailPage,
    LoginPage,
    RegisterPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
   

    {provide: ErrorHandler, useClass: IonicErrorHandler}, PropertyService
  ]
})
export class AppModule {}
