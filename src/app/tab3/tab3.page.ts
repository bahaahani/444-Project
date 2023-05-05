import { Component, OnInit } from '@angular/core';
import { AuthService, users } from '../auth.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userid: any;
  user: users = {} as users;
  constructor(public d: AuthService, public t: ToastController) {
    this.d.auth.authState.subscribe((user) => {
      if (user) {
        this.userid = user.uid;
      }
      if (this.userid) {
        this.d.getUser(this.userid).subscribe((user1) => {
          this.user = user1;
        });
      }
    });
  }
  ngOnInit(): void {}

  LogOut() {
    this.d.logOut1();
  }
  deleteUser() {}
  async Edit() {
    const toat = await this.t.create({
      message: 'Infomration has been updated successfully',
      duration: 2000,
    });
    toat.present();
    // alert(this.user.UserName);
    this.d.updatepro(this.user);
  }
}
