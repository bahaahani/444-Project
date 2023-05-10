import { Component } from '@angular/core';
import { doc, docData } from '@angular/fire/firestore';
import { AuthService, user } from '../auth.service';
import { CarService } from '../car.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  user: user = {} as user;
  constructor(public authSrv: AuthService, public dataSrv: CarService) {
    docData(doc(this.dataSrv.db, 'USERS', this.dataSrv.getUid())).subscribe(
      (user) => {
        this.user = user as user;
      }
    );
  }

  LogOut() {
    this.authSrv.logOut();
  }
  deleteUser() {}
  Edit() {
    alert(this.user.UserName);
    this.authSrv.updatepro(this.user);
  }
}
