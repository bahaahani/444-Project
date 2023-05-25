import { Component, OnInit } from '@angular/core';
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
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {
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
    public dataSrv: CarService,
    public navCtrl: NavController
  ) {
    docData(doc(this.dataSrv.db, 'USERS', this.dataSrv.getUid())).subscribe(
      (user) => {
        this.user = user as user;
      }
    );
  }

  ngOnInit() {}

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
}
