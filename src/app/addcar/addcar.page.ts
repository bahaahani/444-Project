import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CarService, Cars } from 'src/app/car.service';
import { AlertController } from '@ionic/angular';
import { ref, uploadBytes } from '@angular/fire/storage';
@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.page.html',
  styleUrls: ['./addcar.page.scss'],
})
export class AddcarPage {
  showid: any;
  Features: any[] = [];
  speci: any[] = [];
  car: Cars = {} as Cars;
  newItem = '';
  newItem2 = '';
  constructor(
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public dataSrv: CarService
  ) {
    this.showid = navParams.get('id');
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  morespe() {
    if (this.newItem !== '') {
      this.speci.push(this.newItem);
      this.newItem = '';
    }
  }

  morefet() {
    if (this.newItem2 !== '') {
      this.Features.push(this.newItem2);
      this.newItem2 = '';
    }
  }

  @ViewChild('in') imageInput: ElementRef = {} as ElementRef;
  async addnewcar() {
    const alt = await this.alertCtrl.create({
      message: 'New Car Added Successfully',
      buttons: ['OK'],
    });
    this.car.specifications = this.speci;
    this.car.features = this.Features;
    this.car.showroom = this.showid;
    this.car.status = 'available';
    // add image
    const imageId = String(Math.floor(Math.random() * 100000000));
    this.car.image = `https://firebasestorage.googleapis.com/v0/b/project-444-f1ccb.appspot.com/o/${imageId}?alt=media&token=a29f06ee-4b0c-444b-acb7-8f1612e6ecde`;
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.imageInput.nativeElement.files[0]);
    reader.onload = () => {
      reader.result;
      uploadBytes(
        ref(this.dataSrv.storage, imageId),
        reader.result as ArrayBuffer
      );
    };

    this.dataSrv.addNewCar(this.car).then(() => {
      alt.present();
      this.modalCtrl.dismiss();
    });
  }
}
