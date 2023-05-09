import { Component, OnInit } from '@angular/core';
import { AuthService, user } from '../auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userid: any;
  user: user = {} as user;
  constructor(public d: AuthService) {
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
    this.d.logOut();
  }
  deleteUser() {}
  Edit() {
    alert(this.user.UserName);
    this.d.updatepro(this.user);
  }
}
