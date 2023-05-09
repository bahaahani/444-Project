import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import {
  doc,
  getFirestore,
  setDoc,
  updateDoc,
  Firestore,
  collection,
} from 'firebase/firestore';
import { docData } from '@angular/fire/firestore';

export interface user {
  id?: string;
  UserName: string;
  Email: string;
  phone: string;
  admin: boolean;
}

export interface signupInfo {
  id?: string;
  UserName: string;
  Email: string;
  password: string;
  confirmpass: string;
  phone: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  db: Firestore;

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) {
    this.db = getFirestore();
  }

  async signin(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const uid = res.user!.uid;
        localStorage.setItem('uid', JSON.stringify(uid));
        const sub = docData(doc(getFirestore(), 'USERS', uid)).subscribe(
          (user) => {
            if (user['admin']) {
              alert('login in succssfully admin');
              this.navCtrl.navigateForward('/tabs2/tab1Admin');
              sub.unsubscribe();
            } else {
              alert('login in succssfully user');
              this.navCtrl.navigateForward('/tabs/tab1');
              sub.unsubscribe();
            }
          }
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  signup(email: string, pass: string, signupUser: signupInfo) {
    this.auth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        const user = res.user!;
        const newUser = {
          UserName: signupUser.UserName,
          Email: signupUser.Email,
          phone: signupUser.phone,
          admin: false,
        };
        setDoc(doc(this.db, 'USERS', user.uid), newUser);
        localStorage.setItem('uid', JSON.stringify(user.uid));
        alert('Account Successfully Created');
        this.navCtrl.navigateForward('/tabs/tab1');
      })
      .catch(() => {
        alert('The email address is already in use by another!');
      });
    return signupUser.id;
  }

  updatepro(user: user) {
    updateDoc(doc(collection(this.db, 'USERS'), this.getUid()), {
      UserName: user.UserName,
      Email: user.Email,
      phone: user.phone,
    });
  }

  async send(email: string) {
    const mess1 = await this.toastCtrl.create({
      message: 'Reset Password Send Via Email',
      duration: 3000,
    });
    this.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        mess1.present();
      })
      .catch((err) => {
        alert(err);
      });
  }

  getUser(id: string): Observable<user> {
    return docData(doc(collection(this.db, 'USERS'), id)) as any;
  }

  logOut() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('uid');
      this.navCtrl.navigateBack('/home');
    });
  }

  getUid(): string {
    return JSON.parse(localStorage.getItem('uid')!);
  }
}
