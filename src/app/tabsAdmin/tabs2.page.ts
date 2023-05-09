import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-tabs2',
  templateUrl: 'tabs2.page.html',
  styleUrls: ['tabs2.page.scss'],
})
export class TabsPage {
  constructor(public afAuth: AngularFireAuth) {}
}
