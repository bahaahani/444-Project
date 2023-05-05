import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService, Car, Cars, ShowRooms } from 'src/app/car.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carview',
  templateUrl: './carview.page.html',
  styleUrls: ['./carview.page.scss'],
})
export class CarviewPage implements OnInit {
  car!: Cars;
  showroom!: ShowRooms;
  isFavorited: boolean = false;
  selectedDate!: Date;
  selectedTime!: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public dataSrv: CarService
  ) {}

  search() {
    console.log('Search button clicked');
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

  ngOnInit() {}

  toggleFavorite() {
    // this.isFavorited = !this.isFavorited;
    // if (this.isFavorited) {
    //   this.dataSrv.addToFavorites(1);
    // } else {
    //   this.dataSrv.removeFromFavorites(1);
    // }
  }

  requestTestDrive() {
    const request = {
      carId: this.car.id,
      showroomId: this.showroom.id,
      date: this.selectedDate,
      time: this.selectedTime,
    };
    // this.dataSrv.requestTestDrive(request,'1',Date.now());
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
