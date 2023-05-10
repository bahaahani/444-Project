import { Component } from '@angular/core';
import { CarService, Cars } from 'src/app/car.service';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  car: Cars = {} as Cars;
  specification: any[] = [];
  features: any[] = [];

  newItem = '';
  newItem2 = '';
  constructor(
    public dataSrv: CarService,
    public n: NavParams,
    public mod: ModalController
  ) {
    const x = n.get('id');
    this.dataSrv.getCar(x).subscribe((car) => {
      this.car = car;
      this.features = this.car.features;
      this.specification = this.car.specifications;
    });
  }

  close() {
    this.mod.dismiss({
      dismissed: true,
    });
  }
  morespe() {
    if (this.newItem !== '') {
      this.specification.push(this.newItem);
      this.newItem = '';
    } else {
      alert('Can not add empty item');
    }
  }

  morefet() {
    if (this.newItem2 !== '') {
      this.features.push(this.newItem2);
      this.newItem2 = '';
    } else {
      alert('Can not add empty item');
    }
  }

  edit() {
    this.car.features = this.features;
    this.car.specifications = this.specification;
    this.dataSrv.updateCarInfo(this.car);
  }
  remove(i: number) {
    this.features.splice(i, 1);
  }

  remove2(i: number) {
    this.specification.splice(i, 1);
  }
}
