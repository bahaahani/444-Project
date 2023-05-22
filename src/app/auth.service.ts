import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {
  doc,
  getFirestore,
  setDoc,
  updateDoc,
  Firestore,
  collection,
  docData,
} from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { CarService } from './car.service';

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
  constructor(
    public auth: Auth,
    public db: Firestore,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public dataSrv: CarService
  ) {}

  async signin(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        const uid = res.user!.uid;
        localStorage.setItem('uid', JSON.stringify(uid));
        const sub = docData(doc(getFirestore(), 'USERS', uid)).subscribe(
          (user) => {
            if (user['admin']) {
              this.dataSrv.admin = true;
              localStorage.setItem('admin', JSON.stringify('true'));
            }
            localStorage.setItem('username', JSON.stringify(user['UserName']));
            this.navCtrl.navigateForward('/tabs');
            sub.unsubscribe();
          }
        );
      })
      .catch(() => {
        alert('email or password is invalid');
      });
  }

  signup(email: string, pass: string, signupUser: signupInfo) {
    createUserWithEmailAndPassword(this.auth, email, pass)
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
    localStorage.setItem('username', JSON.stringify(user.UserName));
  }

  async send(email: string) {
    const mess1 = await this.toastCtrl.create({
      message: 'Reset Password Send Via Email',
      duration: 3000,
    });
    sendPasswordResetEmail(this.auth, email)
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
      this.dataSrv.admin = false;
      localStorage.removeItem('uid');
      localStorage.removeItem('admin');
      this.navCtrl.navigateBack('/home');
    });
  }

  getUid(): string {
    return JSON.parse(localStorage.getItem('uid')!);
  }
}
