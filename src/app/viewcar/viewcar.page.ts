import { Component } from '@angular/core';
import { doc, getDoc } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Cars, CarService } from '../car.service';

@Component({
  selector: 'app-viewcar',
  templateUrl: './viewcar.page.html',
  styleUrls: ['./viewcar.page.scss'],
})
export class ViewcarPage {
  car: Cars = {} as any;
  constructor(public dataSrv: CarService, public navCtrl: NavController) {
    getDoc(doc(this.dataSrv.carCollection, this.dataSrv.selectedCarId)).then(
      (res) => {
        this.car = res.data()!;
      }
    );
  }
}
