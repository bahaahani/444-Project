import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs2',
  templateUrl: 'tabs2.page.html',
  styleUrls: ['tabs2.page.scss'],
})
export class TabsPage {
  constructor(public afAuth:AngularFireAuth,public router:Router) {

      const authObserver = afAuth.authState.subscribe( 
      user => {
       if (user&&user.email=='may.y26@hotmail.com') {
        //alert("User signed in");
        this.router.navigate(['/tabs/tab1Admin']);
        authObserver.unsubscribe();
       } else {
        //alert("User signed OUT");
        this.router.navigate(['/home']);  //login page
        authObserver.unsubscribe();
       }
      });

  }
}
