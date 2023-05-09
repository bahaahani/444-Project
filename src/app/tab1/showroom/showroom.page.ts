import { Component, OnInit, ViewChild } from '@angular/core';
import { CarService, Car, Cars, TestDrive } from '../../car.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import {
  collection,
  getCountFromServer,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.page.html',
  styleUrls: ['./showroom.page.scss'],
})
export class ShowroomPage implements OnInit {
  public carList: Car[] = [];
  Usr = 'View';
  shoowid: any;
  testDriveDate = new Date();
  constructor(
    public dataSrv: CarService,
    private route: ActivatedRoute,
    public alertCtrl: AlertController
  ) {
    this.shoowid = this.route.snapshot.paramMap.get('id');
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
    const fb = getFirestore();
    const testDriveCollection = collection(fb, 'testDrive');
    const filtered_query = query(testDriveCollection, where('user', '==', uid));
    const snapshot = await getCountFromServer(filtered_query);
    const count = snapshot.data().count;
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
      query(testDriveCollection, where('car', '==', this.selected_car.id))
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
      date: requested_date,
    };
    this.dataSrv.testDriveCollectionRef.doc().set(testDrive);
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Car booked successfully',
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {
    // this.carList = this.dataSrv.carList;
    // const id = this.route.snapshot.paramMap.get('id');
  }
  searchResults: Car[] = [];
  search() {
    this.searchResults = this.dataSrv.carList.filter(
      (car: {
        type: string;
        manufacturer: string;
        model: string;
        color: string;
        mileage: number;
        price: number;
      }) => {
        let matchesType = true;
        let matchesManufacturer = true;
        let matchesModel = true;
        let matchesColor = true;
        let matchesMileage = true;
        let matchesEngineSpecs = true;
        let matchesNumSeats = true;
        let matchesPrice = true;

        if (this.type && this.type !== car.type) {
          matchesType = false;
        }

        if (
          this.manufacturer &&
          !car.manufacturer
            .toLowerCase()
            .includes(this.manufacturer.toLowerCase())
        ) {
          matchesManufacturer = false;
        }

        if (
          this.model &&
          !car.model.toLowerCase().includes(this.model.toLowerCase())
        ) {
          matchesModel = false;
        }

        if (
          this.color &&
          !car.color.toLowerCase().includes(this.color.toLowerCase())
        ) {
          matchesColor = false;
        }

        if (this.mileage && car.mileage > this.mileage) {
          matchesMileage = false;
        }

        if (this.price && car.price > this.price) {
          matchesPrice = false;
        }

        return (
          matchesType &&
          matchesManufacturer &&
          matchesModel &&
          matchesColor &&
          matchesMileage &&
          matchesEngineSpecs &&
          matchesNumSeats &&
          matchesPrice
        );
      }
    );
  }

  price!: number;
  numSeats!: number;
  numDoors!: number;
  engineSpecs!: string;
  model!: string;
  color!: string;
  mileage!: number;
  manufacturer!: string;
  type!: string;
}
