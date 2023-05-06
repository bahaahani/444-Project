import { Component, OnInit } from '@angular/core';
import { CarService, Car, Cars, TestDrive } from '../../car.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.page.html',
  styleUrls: ['./showroom.page.scss'],
})
export class ShowroomPage implements OnInit {
  public carList: Car[] = [];
  shoowid: any;
  constructor(public dataSrv: CarService, private route: ActivatedRoute) {
    this.shoowid = this.route.snapshot.paramMap.get('id');
  }

  requestTestDrive(car: Cars) {
    console.log(car);
    console.log(this.dataSrv.getUid());
    let testDrive: TestDrive = {
      car: car.id!,
      user: this.dataSrv.getUid(),
      carModel: car.model,
      status: 'pending',
      date: new Date(),
    };
    this.dataSrv.testDriveCollectionRef.doc().set(testDrive);
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
