import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService, users } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // private USR: Observable<users[]>;
  public user: users = {} as users;

  LoginForm: FormGroup;
  flag = true;
  constructor(
    public fb: FormBuilder,
    public d: AuthService,
    public t: ToastController
  ) {
    this.LoginForm = fb.group({
      userUserName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]*'),
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
      ],

      Email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          //pattern('[a-zA-Z0-9._%+-]*+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/')
        ]),
      ],
      Phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('[0-9]*'),
          //pattern('[a-zA-Z0-9._%+-]*+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/')
        ]),
      ],

      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('[a-zA-Z0-9]*'),
          Validators.minLength(8),
          Validators.maxLength(30),
        ]),
      ],
      cpass: ['', [Validators.required]],
    });
  }
  ngOnInit() {}

  async signup() {
    const mess = await this.t.create({
      message: 'Check Confirm Password Please',
      duration: 3000,
    });
    if (
      this.LoginForm.valid &&
      this.LoginForm.controls['password'].value ==
        this.LoginForm.controls['cpass'].value
    ) {
      this.user.UserName = this.LoginForm.controls['userUserName'].value;
      this.user.Email = this.LoginForm.controls['Email'].value;
      this.user.phone = this.LoginForm.controls['Phone'].value;
      this.user.password = this.LoginForm.controls['password'].value;
      this.user.confirmpass = this.LoginForm.controls['cpass'].value;
      this.d.signup(
        this.LoginForm.controls['Email'].value,
        this.LoginForm.controls['password'].value,
        this.user
      );
    } else {
      mess.present();
    }
  }
}
