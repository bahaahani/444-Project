import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarService, Cars, TestDrive } from '../../car.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import {
  getCountFromServer,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  Timestamp,
  collectionData,
  and,
} from '@angular/fire/firestore';

declare var dynamics: any;

import { AddcarPage } from 'src/app/addcar/addcar.page';
import { EditPage } from 'src/app/edit/edit.page';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.page.html',
  styleUrls: ['./showroom.page.scss'],
})
export class ShowroomPage {
  admin = this.dataSrv.admin;
  cars: Observable<Cars[]>;
  Usr = 'View';
  shoowid: any;
  testDriveDate = new Date();
  filterParam: any = {};
 
  
  animatebutton(ref:any){
    //animatebutton
    //const b=i.toString();
    //var elem = document.getElementById(b);
    dynamics.animate(ref.el, {
     // translateX: 350,
     scaleX:0.9
    }, {
      type: dynamics.bounce,
      duration: 1000,
      bounciness:0,

      //friction: 200,
      complete:()=>{
      if(ref.el!=null)
      ref.el.style.color='red';
    }
    });
  /*  const element = document.getElementById(b);

    dynamics.animate(
      element,
      {
        translateX: ['-10px', '10px'],
        rotateZ: ['-5deg', '5deg'],
      },
      {
        type: dynamics.forceWithGravity,
        frequency: 10,
        friction: 200,
        duration: 1500,
      }
    );*/
  }

 /* shakeImage() {
    const b=i.toString();
    const element = document.getElementById(b);
    dynamics.animate(
      element,
      {
        translateX: ['-10px', '10px'],
        rotateZ: ['-5deg', '5deg'],
      },
      {
        type: dynamics.forceWithGravity,
        frequency: 10,
        friction: 200,
        duration: 1500,
      }
    );
  }*/
  filter() {
    this.filterParam = JSON.parse(JSON.stringify(this.filterParam));
  }

  constructor(
    public dataSrv: CarService,
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    this.shoowid = this.route.snapshot.paramMap.get('id');

    if (this.admin) {
      this.cars = collectionData(
        query(
          this.dataSrv.carCollection,
          where('showroom', '==', this.shoowid)
        ),
        { idField: 'id' }
      );
    } else {
      this.cars = collectionData(
        query(
          this.dataSrv.carCollection,
          and(
            where('showroom', '==', this.shoowid),
            where('status', '==', 'available')
          )
        ),
        {
          idField: 'id',
        }
      );
    }
  }

  @ViewChild(IonModal) testDriveDateModal: IonModal = {} as any;
  selectDate() {
    this.testDriveDateModal.present();
  }
  selected_car: Cars = {} as any;
  async requestTestDrive(e: any) {
    let uid = this.dataSrv.getUid();
    const requested_date = new Date(e.detail.value);

    // ensure user have less than 3 test drives
    const count = (
      await getCountFromServer(
        query(this.dataSrv.testDriveCollection, where('user', '==', uid))
      )
    ).data().count;
    if (count >= 3) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Maximum number of test drives is 3',
        buttons: ['Dismiss'],
      });
      await alert.present();
      return;
    }

    // ensure no time conflict
    const booked_dates: Array<String> = [];
    const date_query = await getDocs(
      query(
        this.dataSrv.testDriveCollection,
        where('car', '==', this.selected_car.id)
      )
    );
    date_query.forEach((doc) =>
      booked_dates.push(doc.data()['date'].toDate().toDateString())
    );
    const request_date_string = requested_date.toDateString();
    if (booked_dates.includes(request_date_string)) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Car already booked on that day',
        buttons: ['Dismiss'],
      });
      await alert.present();
      return;
    }

    // put the test drive in firebase
    let testDrive: TestDrive = {
      car: this.selected_car.id!,
      user: uid,
      carModel: this.selected_car.model,
      status: 'pending',
      date: requested_date as any as Timestamp,
    };
    setDoc(doc(this.dataSrv.testDriveCollection), testDrive);
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Car booked successfully',
      buttons: ['OK'],
    });
    await alert.present();
  }

  deleteCar(c: any) {
    this.dataSrv.deleteCar(c.id);
  }

  async openEdit(car: any) {
    const mod = await this.modalCtrl.create({
      component: EditPage,
      componentProps: {
        id: car.id,
      },
    });
    return mod.present();
  }

  async addnewcar() {
    const modal = await this.modalCtrl.create({
      component: AddcarPage,
      componentProps: {
        id: this.shoowid,
      },
    });
    modal.present();
  }
}
