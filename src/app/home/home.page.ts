import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(navCtrl: NavController) {
    if (JSON.parse(localStorage.getItem('uid')!)) {
      navCtrl.navigateRoot('tabs');
    }
  }
}
