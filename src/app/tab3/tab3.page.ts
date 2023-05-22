import { Component } from '@angular/core';
import { AuthService, user } from '../auth.service';
import { ToastController } from '@ionic/angular';
import {
  collectionData,
  deleteDoc,
  doc,
  docData,
  query,
  where,
} from '@angular/fire/firestore';
import { CarService } from '../car.service';
declare var dynamics: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  favorites = collectionData(
    query(
      this.dataSrv.favoriteCollection,
      where('userid', '==', this.dataSrv.getUid())
    ),
    { idField: 'id' }
  );
  user: user = {} as user;

  constructor(
    public authSrv: AuthService,
    public toastCtrl: ToastController,
    public dataSrv: CarService
  ) {
    docData(doc(this.dataSrv.db, 'USERS', this.dataSrv.getUid())).subscribe(
      (user) => {
        this.user = user as user;
      }
    );
  }

  async removeFavorite(fid: string) {
    const toast = await this.toastCtrl.create({
      message: 'Car removed from favorite',
      duration: 1500,
      position: 'bottom',
    });
    deleteDoc(doc(this.dataSrv.favoriteCollection, fid)).then(() => {
      toast.present();
    });
  }

  LogOut() {
    this.authSrv.logOut();
  }
  shakeImage() {
    const element = document.getElementById('myImage');
    dynamics.animate(
      element,
      {
        translateX: ['-10px', '10px'],
        rotateZ: ['-5deg', '5deg'],
      },
      {
        type: dynamics.spring,
        frequency: 10,
        friction: 200,
        duration: 1500,
      }
    );
  }
  
  async Edit() {
    const toat = await this.toastCtrl.create({
      message: 'Infomration has been updated successfully',
      duration: 2000,
    });
    toat.present();
    this.authSrv.updatepro(this.user);
  }
}
