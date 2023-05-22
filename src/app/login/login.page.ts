import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(public authSrv: AuthService, public toastCtrl: ToastController) {}
  email = '';
  password = '';
  async login() {
    const mess1 = await this.toastCtrl.create({
      message: 'Enter Your Email Please!',
      duration: 3000,
    });
    const mess2 = await this.toastCtrl.create({
      message: 'Enter Your Password Please!',
      duration: 3000,
    });
    if (this.email == '') mess1.present();
    else if (this.password == '') mess2.present();
    this.authSrv.signin(this.email, this.password);
  }
  send() {
    this.authSrv.send(this.email);
  }
}
