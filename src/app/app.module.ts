import { JwtInterceptor } from './services/jwt.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import  {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

const firebaseConfig = {
  apiKey: "AIzaSyB89hSpt4JntFPTHAkaL5SbWMQZJRGh6PI",
  authDomain: "twitter-1db2a.firebaseapp.com",
  projectId: "twitter-1db2a",
  storageBucket: "twitter-1db2a.appspot.com",
  messagingSenderId: "545332404621",
  appId: "1:545332404621:web:ef2803fbc5455cf97dddc4",
  measurementId: "G-274TWL08ZV"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
