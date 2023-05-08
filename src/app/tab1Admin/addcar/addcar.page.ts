import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CarService, Cars } from 'src/app/car.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.page.html',
  styleUrls: ['./addcar.page.scss'],
})
export class AddcarPage implements OnInit {
  showid: any;
  Features: any[] = [];
  speci: any[] = [];
  car: Cars = {} as Cars;
  newItem = '';
  newItem2 = '';
  constructor(
    public a: AlertController,
    public n: NavParams,
    public mod: ModalController,
    public d: CarService
  ) {
    this.showid = n.get('id');
  }

  ngOnInit() {}

  close() {
    this.mod.dismiss({
      dismissed: true,
    });
  }

  morespe() {
    if (this.newItem !== '') {
      this.speci.push(this.newItem);
      this.newItem = '';
    } else {
      alert('Can not add empty item');
    }
  }

  morefet() {
    if (this.newItem2 !== '') {
      this.Features.push(this.newItem2);
      this.newItem2 = '';
    } else {
      alert('Can not add empty item');
    }
  }

  async addnewcar() {
    const alt = await this.a.create({
      message: 'New Car Added Successfully',
      buttons: ['OK'],
    });
    this.car.specifications = this.speci;
    this.car.features = this.Features;
    this.car.showroom = this.showid;
    this.car.sold=false;
    this.d.addnewcar1(this.car).then(() => {
      alt.present();
      this.mod.dismiss();
    });
  }
}
