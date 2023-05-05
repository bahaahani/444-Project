import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { EditPageModule } from './tab1Admin/edit/edit.module';
import { AddcarPageModule } from './tab1Admin/addcar/addcar.module';
const firebaseConfig = {
  apiKey: 'AIzaSyAQa-sstdNK74uYX32U5UPOL-NRkxVvRjM',
  authDomain: 'project-444-f1ccb.firebaseapp.com',
  projectId: 'project-444-f1ccb',
  storageBucket: 'project-444-f1ccb.appspot.com',
  messagingSenderId: '230656632423',
  appId: '1:230656632423:web:47aa9911a1b0e56788d6c2',
  measurementId: 'G-RELNF9LX9X',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    EditPageModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
