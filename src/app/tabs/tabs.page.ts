import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    const authObserver = afAuth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.router.navigate(['/tabs/tab1']);
        authObserver.unsubscribe();
      } else {
        this.router.navigate(['/home']); //login page
        authObserver.unsubscribe();
      }
    });
  }
}
