import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public d: AuthService, public t: ToastController) {}
  email = '';
  password = '';
  ngOnInit() {}
  async login() {
    const mess1 = await this.t.create({
      message: 'Enter Your Email Please!',
      duration: 3000,
    });
    const mess2 = await this.t.create({
      message: 'Enter Your Password Please!',
      duration: 3000,
    });
    if (this.email == '') mess1.present();
    else if (this.password == '') mess2.present();
    this.d.signin(this.email, this.password);
  }
  send() {
    this.d.send(this.email);
  }
}
